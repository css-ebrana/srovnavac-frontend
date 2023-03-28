import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../css/style.css";

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
            isDisabled: true
        }
        this.searchForm = React.createRef()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.searchForm.current.submit()
    }

    render() {
        return (
            <div className="searching-bar">
                <div className="search-div" style={{ marginTop: "4%", marginBottom: "4%", minWidth: "20%", padding: "10px" }}>
                    <h3 className="bold-header" style={{ position: "relative", left: "20%", marginBottom: "5%", maxWidth: "80%", width: "50%", color: "#575757" }}><b>Vybírejte z tisíců produktů</b></h3>
                    <form ref={this.searchForm} onSubmit={this.onSubmit} style={{ borderRadius: "12px", boxShadow: "0px 8px 16px rgba(0,0,0,0.1)" }}>
                        <div className="input-group">
                            <input className="form-control" type="text" value={this.state.search} onChange={this.onChange} style={{
                                outline: "none", padding: "20px",
                                border: "2px solid #009FE3"
                            }}
                                placeholder="Např. rozetové kování" name="search" required />
                            <button className="btn btn-default" type="submit" style={{
                                border: "2px solid #009FE3",
                                backgroundImage: "linear-gradient(to right, #009FE3, #00CADD)",
                                color: "white", outline: "none", minWidth: "20%", position: "relative"
                            }}>Vyhledat<FontAwesomeIcon style={{ paddingLeft: "5px" }} icon={faSearch} size="lg" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;