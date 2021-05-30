import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

import small_32 from "../images/small_batch32.png"
import small_deep from "../images/small_deep.png"

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
                    kann. Die Ergebnisse sehen
                    reproduzierbar wie folgt aus:
                    <img src={small_deep}/>
                    Die Vorhersage ändert sich so gut wie nicht und beschreibt eine Gerade die dem Datensatz kaum folgt.
                </p>
                <h3>Overfitting</h3>
                <p>
                    Bei der Verwenung des großen Datensatzes zusammen mit einem sehr kleinen Netz (lediglich Ein- und Ausgabeschicht) kommt es zu einem Overfitting.
                    dies
                </p>


                <h2>Bias und Varianz</h2>
                <h2>Aktivierungsfunktionen</h2>
                <h2>Lernrate und Optimizer</h2>
                <h2>Anzahl der Epochs/Batch sizes</h2>
                <p>
                    Die Anzahl der Epochs wurde zum Start auf 20 festgelegt. Um eine vergleichbare Erzeugung des Models
                    zu gewährleisten.
                    Jedoch war bei so gut wie allen Modellen ersichtlich, dass der Fehler ab 10 Epochs nicht mehr stark
                    abnimmt.
                    Update !!!!

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