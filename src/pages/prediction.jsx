import React, {useEffect, useRef} from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

import dataSmallJson from "../data/data_small.json"
import dataMediumJson from "../data/data_medium.json"
import dataBigJson from "../data/data_big.json"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";

function PredictionPage() {

    const userInputValueRef = useRef(0)
    const predictionValueRef = useRef()
    let model;
    let tensorData;
    let inputMax;
    let inputMin;
    let labelMax;
    let labelMin;

    function unNormalize(xs, inputMax, inputMin, preds, labelMax, labelMin) {
        const unNormXs = xs
            .mul(inputMax.sub(inputMin))
            .add(inputMin);

        const unNormPreds = preds
            .mul(labelMax.sub(labelMin))
            .add(labelMin);
        return {unNormXs, unNormPreds};
    }

    useEffect(() => {
        startModelCreationChain()
    })

    function startModelCreationChain() {
        const getData = async () => {

            // dataSmallJson
            // dataMediumJson
            // dataBigJson
            return dataMediumJson.map(dataEntry => ({
                x: dataEntry.x,
                y: dataEntry.y,
            }))
                .filter(dataEntry => (dataEntry.x != null && dataEntry.y != null));
        }

        function convertToTensor(data) {
            // Wrapping these calculations in a tidy will dispose any
            // intermediate tensors.

            return tf.tidy(() => {
                // Step 1. Shuffle the data
                tf.util.shuffle(data);

                // Step 2. Convert data to Tensor
                const inputs = data.map(d => d.x)
                const labels = data.map(d => d.y);

                const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
                const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

                //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
                inputMax = inputTensor.max();
                inputMin = inputTensor.min();
                labelMax = labelTensor.max();
                labelMin = labelTensor.min();

                const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
                const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

                return {
                    inputs: normalizedInputs,
                    labels: normalizedLabels,
                    // Return the min/max bounds so we can use them later.
                    inputMax,
                    inputMin,
                    labelMax,
                    labelMin,
                }
            });
        }

        const createModel = () => {
            model = tf.sequential();

            model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
            model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));

            // Add an output layer
            model.add(tf.layers.dense({units: 1, useBias: true}));

            return model;
        }

        const trainModel = async (model, inputs, labels) => {
            // Prepare the model for training.
            model.compile({
                // optimizer: tf.train.adam(0.0001),
                optimizer: tf.train.adam(),
                loss: tf.losses.meanSquaredError,
                metrics: ['mse'],
            });

            // adadelta
            // adagrad
            // adam
            // adamax
            // momentum
            // rmsprop
            // sgd

            const batchSize = 64; // 5, 20, 32, 64
            const epochs = 20;

            return await model.fit(inputs, labels, {
                batchSize,
                epochs,
                shuffle: true,
                callbacks: tfvis.show.fitCallbacks(
                    {name: 'Training Performance'},
                    ['loss', 'mse'],
                    {height: 200, callbacks: ['onEpochEnd']}
                )
            });
        }

        const testModel = (model, inputData, normalizationData) => {
            const {inputMax, inputMin, labelMin, labelMax} = normalizationData;

            const [xs, preds] = tf.tidy(() => {
                const xs = tf.linspace(0, 1, 100);
                const preds = model.predict(xs.reshape([100, 1]));
                const {unNormXs, unNormPreds} = unNormalize(xs, inputMax, inputMin, preds, labelMax, labelMin);

                return [unNormXs.dataSync(), unNormPreds.dataSync()];
            });

            const predictedPoints = Array.from(xs).map((val, i) => {
                return {x: val, y: preds[i]}
            });
            const originalPoints = inputData.map(d => ({
                x: d.x, y: d.y,
            }));

            tfvis.render.scatterplot(
                {name: 'Model Predictions vs Original Data'},
                {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
                {
                    xLabel: 'x',
                    yLabel: 'y',
                    height: 300
                }
            );
        }

        const run = async () => {
            // Load and plot the original input data that we are going to train on.
            const data = await getData();
            const values = data.map(dataEntry => ({
                x: dataEntry.x,
                y: dataEntry.y,
            }));

            tfvis.render.scatterplot(
                {name: 'x v value'},
                {values},
                {
                    xLabel: 'x',
                    yLabel: 'y',
                    height: 300
                }
            );

            const model = createModel();
            await tfvis.show.modelSummary({name: 'Model Summary'}, model);

            tensorData = convertToTensor(data);
            const {inputs, labels} = tensorData;

            await trainModel(model, inputs, labels);
            console.log('Done Training');

            testModel(model, data, tensorData);
        }
        run();
    }

    function predictValue() {
        let value = userInputValueRef.current.value;
        const {inputMax, inputMin, labelMin, labelMax} = tensorData;

        const [xs, pred] = tf.tidy(() => {

            const normalizedInputs = tf.tensor([parseInt(value)]).sub(inputMin).div(inputMax.sub(inputMin));
            const xs = tf.linspace(0, 1, 100);
            var pred = model.predict(normalizedInputs, [1, 1]);
            const {unNormXs, unNormPreds} = unNormalize(xs, inputMax, inputMin, pred, labelMax, labelMin);

            return [unNormXs.dataSync(), unNormPreds.dataSync()];
        });

        let predElement = pred[0];

        if (predElement) {
            predictionValueRef.current.value = predElement
            console.log(predElement);
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            color: "white"
        },
        AppBar: {
            background: "#607d8b"
        },
        DokuButton: {
            marginRight: 750,
            color: "white"
        },
        content: {
            marginLeft: 100,
            marginRight: 100,
            marginTop: 100,
            display: "flex",
            flexDirection: "column",
            width: "400",
            height: "100vh"
        },
        horizontalImages: {
            display: "flex",
            flexDirection: "row"
        },
        funcButton: {
            width: "fit-content",
            marginTop: 10,
            marginBottom: 10
        },
        table: {
            width: 250,
        },
        prediction: {
            marginLeft: 20
        }
    }));
    const classes = useStyles();

    async function toggleVisorVisibility() {
        // await model.save('downloads://my-model')
        tfvis.visor().toggle()
    }

    function createData(name, value) {
        return {name, value};
    }

    const rows = [
        createData('Batch Size', 32),
        createData('Optimizer', "Adam"),
        createData('Learning Rate', 0.001),
        createData('Epochs', 20),
        createData('Loss', "MSE"),
        createData('Training Data size', 500)
    ];

    return <div>
        <AppBar position="static" className={classes.AppBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Deep Learning - André Schwarz
                </Typography>
                <Link to="/documentation">
                    <Button color="primary" className={classes.DokuButton}>Aufgabe 3 - Zur Dokumentation</Button>
                </Link>
            </Toolbar>
        </AppBar>

        <div className={classes.content}>
            <Button variant="contained" color="primary" onClick={predictValue} className={classes.funcButton}> Wert
                vorhersagen</Button>
            <div className={classes.horizontalImages}>
                <TextField id="userInput" label="User Input" type="number" variant="outlined"
                           inputRef={userInputValueRef}/>
                <TextField
                    id="prediction"
                    InputProps={{
                        readOnly: true,
                    }}
                    className={classes.prediction}
                    inputRef={predictionValueRef}
                />
                {/*<TextField id="prediction" label="Prediction" type="readOnly" variant="outlined" InputProps={{*/}
                {/*    readOnly: true,*/}
                {/*}}*/}
                {/*           inputRef={predictionValueRef}/>*/}
            </div>
            <Button variant="primary" color="primary" onClick={toggleVisorVisibility} className={classes.funcButton}>Modelldetails
                anzeigen/ausblenden</Button>
            <Button variant="primary"  onClick={startModelCreationChain}
                    className={classes.funcButton}>Modellerstellung
                neustarten</Button>

            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>;
}

export default PredictionPage;
