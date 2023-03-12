import {Component} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({char}) => {
    const elements = char.map(item => {
        const {id, name, thumbnail} = item;
        return (
            <CharItem key={id} nameChar={name} thumbnail={thumbnail}/>
        )
    });

    return (
        <ul className="char__grid">
            {elements}
        </ul>
    )
}

const CharItem = (props) => {
    const {nameChar, thumbnail} = props;

    const notImg = thumbnail.includes('image_not_available');

    return (
        <li className="char__item">
            <img src={thumbnail} style={notImg ? {objectFit: 'contain'} : {objectFit: 'cover'}} alt={nameChar}/>
            <div className="char__name">{nameChar}</div>
        </li>
    )
}

export default CharList;