import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

import small_32 from "../images/small_batch32.png"
import small_deep from "../images/small_deep.png"
import loss_overfitting from "../images/loss_overfitting.png"
import bias_variance from "../images/bias_variance.jpeg"

import learningRate_small from "../images/learningRate_small.png"
import learningRate_normal from "../images/learningRate_normal.png"
import learningRate_high from "../images/learningRate_high.png"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    contentDiv: {
        marginRight: 50,
        marginLeft: 50
    },
    title: {
        flexGrow: 1,
        color: "black"
    },
    AppBar: {
        background: "beige"
    },
    LoginButton: {
        marginRight: 50
    },
    horizontalImages: {
        display: "flex",
        flexDirection: "row"
    }
}));

const DocumentationPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.AppBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Deep Learning - André Schwarz
                    </Typography>
                    <Link to="/">
                        <Button color="primary" className={classes.LoginButton}>Aufgabe 3 - Vorhersage</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <div className={classes.contentDiv}>
                <h1>Herangehensweise, Dokumentation und Quellen</h1>

                <h2>Tech Stack</h2>
                <p>
                    react <br/>
                    tensorflow
                </p>

                <h2>Daten</h2>
                <p>
                    Für das Training der Netze wurden Daten generiert. Dazu wurde die gegebene Formel
                    iterativ mit gleichmäßig verteilten Daten berechnet.
                    Insgesamt wurden drei verschiedene Datensätze erzeugt, die alle den Zahlenbereich von 0 bis 50
                    abdecken.

                    Der Unterschied liegt in der unterschiedlichen Stepsize von 0.01, 0.1 und 1.
                    Dementsprechend beinhalten die Datensätze 5000, 500 und 50 Einträge.

                </p>

                <h2>Over- und Underfitting</h2>
                <p>
                    Normalerweise ist es bei der Modellerstellung immer das Ziel ein Over-, sowie Underfitting zu
                    vermeiden.
                    Für einen Versuch wurde dieses Verhalten jedoch provoziert.
                </p>
                <h3>Underfitting</h3>
                <p>
                    Um ein Underfitting zu erzeugen, wurde der kleine Datensatz zusammen mit einem zu tiefem Netz
                    trainiert.
                    Insgesamt wurden 8 hidden layer erzeugt. Das Ergebnis ist ein Modell, das dem Datensatz kaum folgen
                    kann. Die Ergebnisse sehen reproduzierbar wie folgt aus:<br/>
                    <img src={small_deep}/><br/>
                    Die Vorhersage ändert sich so gut wie nicht und beschreibt eine Gerade die dem Datensatz kaum folgt.
                </p>
                <h3>Overfitting</h3>
                <p>
                    Bei der Verwenung des großen Datensatzes zusammen mit einem sehr kleinen Netz (lediglich Ein- und
                    Ausgabeschicht) kommt es zu einem Overfitting.
                    Der Fehler der beim Training entsteht fällt sehr schnell ab und bleibt nach einigen wenigen Epochs
                    ohne große Änderungen.
                    Das Modell hat die Trainingsdaten auswendig gelernt. <br/>
                    <img src={loss_overfitting}/>
                </p>


                <h3>Bias und Varianz</h3>

                Es gibt Modelle, die zu vereinfacht sind und wichtige Beziehungen in den Trainingsdaten ignorieren, die
                ihre Vorhersagen hätten verbessern können.
                Bei solchen Modellen spricht man von einem hohen Bias. Wenn ein Modell einen hohen Bias hat, sind die
                Vorhersagen konsistent falsch,
                im besten Fall nur für bestimmte Bereiche der Daten und nicht für den gesamten Bereich.
                Wenn wie in diesem Beispiel versucht, eine Linie an ein Diagramm anzupassen bei dem die Daten einem
                kurvenlinearen Muster folgen,
                ist es relativ vorhersehbar, dass sich das Modell nicht gut an die Daten anpassen kann.
                In einigen Teilen des Diagramms wird die Linie unter die Kurve fallen und in anderen Teilen wird sie
                über der Kurve liegen, wobei sie versucht, dem Verlauf einer Kurve zu folgen.

                Es handelt sich also um Vorhersagen, die konstant falsch sind. Bei Modellen mit einem hohen Bias spricht
                man von einer Unteranpassung [an die Trainingsdaten],
                und daher ist der Vorhersagefehler sowohl bei den Trainingsdaten als auch bei den Testdaten hoch.
                Einige Modelle sind zu komplex, und bei der Suche nach wichtigen Beziehungen zwischen den Variablen
                werden zufällig auch bestimmte Beziehungen erfasst,
                die sich nur als Ergebnis von Rauschen herausstellen. Mit anderen Worten, das Modell berücksichtigt
                bestimmte "Ausreißer" in den Trainingsdaten,
                die sich nicht auf die Testdaten verallgemeinern lassen. In einem solchen Fall liegen die Vorhersagen
                des Modells wieder einmal daneben,
                aber hier ist der wichtige Teil: Sie liegen nicht konstant daneben. Bei kleinen Änderungen der Daten,
                können sehr unterschiedliche Vorhersagen gemacht werden.
                Das Modell ist also zu empfindlich und reagiert übermäßig auf die Veränderung der Daten. Bei Modellen
                mit hoher Varianz spricht man von einer
                Überanpassung [an die Trainingsdaten], und daher ist ihr Vorhersagefehler bei den Trainingsdaten
                trügerisch niedrig, bei den Testdaten aber hoch,
                daher die fehlende Generalisierung.

                <br/>
                Der Zusammenhand ist in folgendem Bild sehr gut ersichtlich :

                <img src={bias_variance}/>
                <br/>https://towardsdatascience.com/bias-and-variance-but-what-are-they-really-ac539817e171 <br/> <br/>

                Das Ziel ist dementsprechend das Modell auf die Modell Komplexität anzupassen. Ein unglaubwürdig
                geringer Fehler beim Training weist auf ein Problem hin. Dies ist bei
                den Versuchen zu dieser Aufgabe geschehen (beschrieben in Under- Overfitting).

                <h2>Aktivierungsfunktionen</h2>
                <h2>Lernrate und Optimizer</h2>

                Die Lernrate ist ein sehr wichtiger Hyperparameter bei der Modellerstellung. Dieser steuert wie stark
                das Modell auf den geschätzten Fehler
                nach der Aktualisierung der Gewichte reagieren soll.
                Eine zu kleine Lernrate führt zu einem sehr langen Training, ein zu großer Wert zu einem zu schnellen
                und instabilen Lernen,
                wodurch der Lernprozess sehr schnell zum erliegen kommen kann. Dieses Verhalten ist übergreifend über
                alle Optimizer zu beobachten. Die folgenden
                Bilder zeigen das Verhalten beispielhaft am "Adam Optimizer":

                <div className="horizontalImages">
                    <img src={learningRate_small}/>
                    <img src={learningRate_normal}/>
                    <img src={learningRate_high}/>
                </div>

                <br/>
                Bei dem ersten Beispiel wurde eine Lernrate von 0.0001 gewählt. Hier ist ein enorm hoher Fehler zu erkennen,
                der sich im Laufe des Trainings kaum verringert.
                Das zweite Beispiel wurde mit der Standard Lernrate von 0.001 durchgeführt. Hierbei ist eine Verringerung des Fehlers erkennbar,
                der über den vollen Trainingsvorgang stetig abnimmt.
                Das dritte Beispiel wurde mit einer Lernrate von 0.5 durchgeführt. Der Fehler nimmt schon nach dem ersten Epoch stark ab und läuft
                dann auf einem sehr geringen Level weiter. Der Lernprozess findet jetzt kaum noch statt.

                <h2>Anzahl der Epochs/Batch sizes</h2>
                <p>
                    Die Anzahl der Epochs wurde zum Start auf 20 festgelegt. Um eine vergleichbare Erzeugung des Models
                    zu gewährleisten.
                    Jedoch war bei so gut wie allen Modellen ersichtlich, dass der Fehler ab 10 Epochs nicht mehr stark
                    abnimmt. Dadurch ist der Einfluss als eher gering einzuschätzen.

                    Die Batch Size hat einen großen Einfluss auf die Qualität des Modells. Diese muss auf die
                    Trainingsdatengröße angepasst
                    sein. Bei dem kleinen Datensatz mit nur 50 Einträgen, darf nur eine geringe Batch size gewählt
                    werden.
                    Dazu wurden mehrere Modelle mit folgenden Batch Sizes trainiert: 5, 20, 32, 64.
                    Die Qualität war sehr schwankend. Obwohl der Datensatz vor dem Training gemischt wurde,
                    ist es bei so kleinen Datensätzen eher wahrscheinlich das die Daten nicht wirklich zufällig
                    durchgearbeitet werden.
                    Je größer die Batch Size gewählt wurde, desto öfter wurde das Modell völlig falsch trainiert und der
                    Fehler war extremer.
                    Folgendes Beispiel für ein sehr fehlerhaftes Modell wurde mit dem kleinen Datensatz und einer Batch
                    Size von 32 erzeugt.
                </p>
                <img src={small_32} alt={small_32}/>
                <h2>Anzahl der Hidden Layer und Neuronen</h2>
            </div>
        </div>
    );
};

export default DocumentationPage;