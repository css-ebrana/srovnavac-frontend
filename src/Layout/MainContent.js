import React, { Component } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import background from "../background.png";
import { Slider } from "rsuite";
import SearchBar from "./SearchBar";
import "rsuite/dist/styles/rsuite-default.css";
import "../css/style.css";
import { ProductCard } from "./ProductCard";
import { Ring } from "react-awesome-spinners";

class ProductContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      brands: [],
      search: decodeURIComponent(this.props.location.search.split("=")[1]),
      addButtonBackgroundColor: "white",
      addButtonTextColor: "#009FE3",
      sortAscButtonBackgroundColor: "linear-gradient(to right, white, white)",
      sortAscButtonTextColor: "#009FE3",
      sortDescButtonBackgroundColor: "linear-gradient(to right, white, white)",
      sortDescButtonTextColor: "#009FE3",
      limit: 9,
      isDisabled: false,
      btnText: "Zobrazit více položek +",
      price: 50000,
      brand: "",
      isAscButtonDisabled: false,
      isDescButtonDisabled: false,
      isLoading: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    if (this.state.search === "undefined") {
      await fetch("https://srovnavac-backend.herokuapp.com/search/kov")
        //await fetch("http://localhost:8081/search/kov")
        .then((response) => response.json())
        .then((data) => this.setState({ data: data, isLoading: false }));
    } else {
      await fetch(
        `https://srovnavac-backend.herokuapp.com/search/${this.state.search}`
      )
        //await fetch(`http://localhost:8081/search/${this.state.search}`)
        .then((response) => response.json())
        .then((data) => this.setState({ data: data, isLoading: false }));
    }

    await fetch("https://srovnavac-backend.herokuapp.com/getAllBrands")
      //await fetch("http://localhost:8081/getAllBrands")
      .then((response) => response.json())
      .then((brands) => this.setState({ brands: brands, isLoading: false }));
  }

  onMouseEnter() {
    this.setState({
      addButtonBackgroundColor: "#009FE3",
      addButtonTextColor: "white",
    });
  }
  onMouseLeave() {
    this.setState({
      addButtonBackgroundColor: "white",
      addButtonTextColor: "#009FE3",
    });
  }

  sortProductsByPriceAsc(data) {
    this.setState({
      isLoading: true,
    });
    var sortedData = data.data.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    if (this.state.isDescButtonDisabled) {
      this.setState({
        data: sortedData,
        sortAscButtonBackgroundColor:
          "linear-gradient(to right, #009FE3, #00CADD)",
        sortAscButtonTextColor: "white",
        sortDescButtonBackgroundColor:
          "linear-gradient(to right, white, white)",
        sortDescButtonTextColor: "#009FE3",
        isAscButtonDisabled: true,
        isDescButtonDisabled: false,
        isLoading: false,
      });
    } else if (!this.state.isDescButtonDisabled) {
      this.setState({
        data: sortedData,
        sortAscButtonBackgroundColor:
          "linear-gradient(to right, #009FE3, #00CADD)",
        sortAscButtonTextColor: "white",
        isAscButtonDisabled: true,
        isDescButtonDisabled: false,
        isLoading: false,
      });
    }
  }
  sortProductsByPriceDesc(data) {
    this.setState({
      isLoading: true,
    });
    var sortedData = data.data.sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    if (this.state.isAscButtonDisabled) {
      this.setState({
        data: sortedData,
        sortDescButtonBackgroundColor:
          "linear-gradient(to right, #009FE3, #00CADD)",
        sortDescButtonTextColor: "white",
        sortAscButtonBackgroundColor: "linear-gradient(to right, white, white)",
        sortAscButtonTextColor: "#009FE3",
        isDescButtonDisabled: true,
        isAscButtonDisabled: false,
        isLoading: false,
      });
    } else if (!this.state.isDescButtonDisabled) {
      this.setState({
        data: sortedData,
        sortDescButtonBackgroundColor:
          "linear-gradient(to right, #009FE3, #00CADD)",
        sortDescButtonTextColor: "white",
        isDescButtonDisabled: true,
        isAscButtonDisabled: false,
        isLoading: false,
      });
    }
  }

  onClick() {
    if (this.state.data.length >= this.state.limit) {
      this.setState({
        limit: this.state.limit + 6,
        isDisabled: false,
        btnText: "Zobrazit více položek +",
      });
    } else {
      this.setState({
        isDisabled: true,
        btnText: "Žádné další produkty...",
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSliderChange(e) {
    this.setState({
      price: e,
    });
    if (
      this.state.search === "undefined" &&
      this.state.brand.brand === undefined
    ) {
      //fetch(`http://localhost:8081/getProductsByPrice/mosaz/${e}`)
      fetch(
        `https://srovnavac-backend.herokuapp.com/getProductsByPrice/mosaz/${e}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ data: data, isLoading: false }));
    } else if (this.state.brand.brand !== undefined) {
      //fetch(`http://localhost:8081/getProductsByPrice/${this.state.brand.brand}/${e}`)
      fetch(
        `https://srovnavac-backend.herokuapp.com/getProductsByPrice/${this.state.brand.brand}/${e}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ data: data, isLoading: false }));
    } else {
      //fetch(`http://localhost:8081/getProductsByPrice/${this.state.search}/${e}`)
      fetch(
        `https://srovnavac-backend.herokuapp.com/getProductsByPrice/${this.state.search}/${e}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ data: data, isLoading: false }));
    }
  }

  onDropdownClick(brand) {
    this.setState({
      search: undefined,
      brand: brand,
    });
    //fetch(`http://localhost:8081/getProductsByBrand/${brand.brand}`)
    fetch(
      `https://srovnavac-backend.herokuapp.com/getProductsByBrand/${brand.brand}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ data: data, isLoading: false }));
  }

  render() {
    const { data, limit } = this.state;
    var dataList = [];

    if (data.length > 0) {
      dataList = data.slice(0, limit);
    }

    return (
      <div
        className="App"
        style={{
          backgroundImage: `url(${background})`,
          minHeight: "800px",
          marginTop: "5%",
        }}
      >
        <SearchBar />
        <Container>
          <Row>
            <Col sm={12} md={3} lg={3}>
              <div className="bold-filter" style={{ fontSize: "16px" }}>
                <b>Filtr</b>
              </div>
              <Card
                className="card-filter"
                border="light"
                style={{
                  width: "16rem",
                  display: "inline-block",
                  height: "21.0rem",
                  borderRadius: "12px",
                  marginTop: "3%",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  paddingBottom: "32px",
                  paddingTop: "20px",
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
                }}
              >
                <label
                  className="bold"
                  style={{
                    marginRight: "80%",
                    fontSize: "16px",
                    paddingBottom: "0px",
                  }}
                >
                  <b>Cena</b>
                </label>
                <label
                  className="bold"
                  style={{
                    color: "#009FE3",
                    marginLeft: "-46%",
                    fontSize: "15px",
                    paddingBottom: "0px",
                    paddingTop: "0px",
                  }}
                >
                  <b>Do {this.state.price} Kč</b>
                </label>
                <span className="bold">
                  <Slider
                    barClassName="slider"
                    progress
                    graduated
                    min={0}
                    max={300000}
                    defaultValue={50000}
                    step={1000}
                    value={this.state.value}
                    name="price"
                    style={{ color: "#009FE3", marginLeft: "1.6%" }}
                    onChange={this.onSliderChange.bind(this)}
                  />
                </span>
                <label
                  className="bold"
                  style={{
                    marginRight: "80%",
                    marginTop: "5%",
                    fontSize: "16px",
                  }}
                >
                  <b>Seřadit:</b>
                </label>
                <div style={{ marginTop: "-5%" }}>
                  <button
                    className="sort-buttons"
                    style={{
                      float: "left",
                      border: "2px solid #009FE3",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                      paddingRight: "7px",
                      paddingLeft: "7px",
                      borderRadius: "8px",
                      outline: "none",
                      minWidth: "20%",
                      position: "relative",
                      fontSize: "16px",
                      boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
                      backgroundImage: this.state.sortAscButtonBackgroundColor,
                      color: this.state.sortAscButtonTextColor,
                    }}
                    disabled={this.state.isAscButtonDisabled}
                    onClick={this.sortProductsByPriceAsc.bind(this, { data })}
                  >
                    Vzestupně
                  </button>
                  <button
                    className="sort-buttons"
                    style={{
                      float: "right",
                      border: "2px solid #009FE3",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                      paddingRight: "7px",
                      paddingLeft: "7px",
                      borderRadius: "8px",
                      outline: "none",
                      minWidth: "20%",
                      position: "relative",
                      width: "44%",
                      fontSize: "16px",
                      boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
                      backgroundImage: this.state.sortDescButtonBackgroundColor,
                      color: this.state.sortDescButtonTextColor,
                    }}
                    disabled={this.state.isDescButtonDisabled}
                    onClick={this.sortProductsByPriceDesc.bind(this, { data })}
                  >
                    Sestupně
                  </button>
                </div>
                <label
                  className="bold"
                  style={{
                    marginRight: "80%",
                    marginTop: "5%",
                    fontSize: "16px",
                  }}
                >
                  <b>Značky</b>
                </label>
                <div
                  className="col-sm-8"
                  style={{
                    marginLeft: "-7%",
                    marginTop: "-5%",
                    height: "90%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    position: "absolute",
                  }}
                >
                  <DropdownButton
                    id="brand-dropdown"
                    className="regular-dropdown"
                    title="Všechny značky"
                  >
                    {this.state.brands.map((brand, key) => {
                      return (
                        <Dropdown.Item
                          as="button"
                          style={{ borderRadius: "8px" }}
                          key={key}
                          onSelect={this.onDropdownClick.bind(this, { brand })}
                        >
                          {" "}
                          {brand}{" "}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </div>
              </Card>
            </Col>
            <Col sm={12} md={9} lg={9}>
              <div className="bold-results" style={{ fontSize: "16px" }}>
                Výsledky vyhledávání
              </div>
              {this.state.data.length === 0 && !this.state.isLoading ? (
                <div>
                  <h5 className="bold" style={{ marginTop: "15%" }}>
                    {" "}
                    Omlouváme se, ale nenašli jsme žádné produkty dle vaší
                    specifikace...{" "}
                  </h5>
                  <h6 className="bold">
                    {" "}
                    Začněte znovu například vyhledáním produktu{" "}
                  </h6>
                </div>
              ) : (
                dataList.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
              )}
              {this.state.isLoading ? (
                <div>
                  <div style={{ marginTop: "10%", marginBottom: "5%" }}>
                    <h5 className="bold"> Hledáme vhodné produkty... </h5>
                    <h6 className="bold" style={{ fontSize: "14px" }}>
                      {" "}
                      Mějte prosím chvíli strpení{" "}
                    </h6>
                  </div>
                  <Ring />
                </div>
              ) : (
                dataList.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
              )}
              {data.length > this.state.limit ? (
                <button
                  className="bold-button"
                  style={{
                    backgroundColor: this.state.addButtonBackgroundColor,
                    color: this.state.addButtonTextColor,
                    fontSize: "18px",
                    marginBottom: "3%",
                    marginTop: "3%",
                    padding: "14px 21px",
                    border: "3px solid #009FE3",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                  disabled={this.state.isDisabled}
                  onClick={this.onClick.bind(this)}
                  onMouseEnter={this.onMouseEnter.bind(this)}
                  onMouseLeave={this.onMouseLeave.bind(this)}
                >
                  <b>{this.state.btnText}</b>
                </button>
              ) : (
                <p></p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ProductContent;
