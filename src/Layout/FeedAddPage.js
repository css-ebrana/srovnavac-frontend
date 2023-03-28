import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import "../css/style.css";
import background from "../background.png";
import { Ring } from "react-awesome-spinners";

class FeedAddPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: "",
      password: "",
      error: "",
      isError: false,
      isLoading: false,
      color: "red",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    let message = "";
    let isError = false;
    var color = "";

    this.setState({
      feed: e.target.feed.value,
      password: e.target.password.value,
      isLoading: true,
    });

    //await axios.post(`http://localhost:8081/parse/${encodeURIComponent(encodeURIComponent(e.target.feed.value))}/${e.target.password.value}`)
    await axios
      .post(
        `https://srovnavac-backend.herokuapp.com/parse/${encodeURIComponent(
          encodeURIComponent(e.target.feed.value)
        )}/${e.target.password.value}`
      )
      .catch(function (error) {
        if (error.response) {
          message = error.response.data.message;
          console.log(message);
          if (
            message != null &&
            message.toString().includes("query did not return a unique result:")
          ) {
            message = "Tento feed se ve srovnávači již nachází";
            isError = true;
            color = "red";
            console.log(message);
          } else if (
            message != null &&
            message.toString().includes("java.net.MalformedURLException:")
          ) {
            message = "Chybná URL adresa feedu";
            isError = true;
            color = "red";
            console.log(message);
          } else if (error.response.status === 500 && message === null) {
            message = "Nesprávné heslo";
            isError = true;
            color = "red";
            console.log(message);
          } else if (error.response.status === null && message === null) {
            message = "Vše proběhlo v pořádku :)";
            isError = false;
            color = "green";
            console.log(message);
          } else {
            message = "Nefunkční feed nebo špatné heslo :(";
            color = "red";
          }
        }
      });
    this.setState({
      error: message,
      isError: isError,
      isLoading: false,
      color: color,
    });
  }

  render() {
    return (
      <div style={{ backgroundImage: `url(${background})` }}>
        <Container
          className="feed-container"
          style={{ marginLeft: "44%", marginTop: "10%" }}
        >
          <Row>
            <h3>Vložte URL feedu</h3>
          </Row>
          <Row>
            <form onSubmit={this.onSubmit} style={{ width: "60%" }}>
              <Row lg={12} style={{ marginTop: "6%" }}>
                <label>Feed URL:</label>
                <input
                  type="text"
                  name="feed"
                  value={this.state.feed}
                  onChange={this.onChange}
                  placeholder="https://www."
                  required
                />
              </Row>
              <Row lg={12} style={{ marginTop: "5%" }}>
                <label>Heslo:</label>
                <input
                  className="feed-password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="Tajné heslo..."
                  required
                />
              </Row>

              {this.state.isLoading ? (
                <Ring />
              ) : (
                <p style={{ color: this.state.color, marginTop: "3%" }}>
                  {this.state.error}
                </p>
              )}

              <div className="row" style={{ marginTop: "6%" }}>
                <input
                  className="submit-button"
                  type="submit"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #009FE3",
                    backgroundImage:
                      "linear-gradient(to right, #009FE3, #00CADD)",
                    color: "white",
                    outline: "none",
                    position: "absolute",
                  }}
                />
              </div>
            </form>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FeedAddPage;
