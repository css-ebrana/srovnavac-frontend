import React from "react";
import { Card } from "react-bootstrap";
import psl from "psl";

// Extract hostname from url
function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

export const ProductCard = ({ product }) => {
  let hostname = psl.get(extractHostname(product.link));
  let productLink = "";
  if (!product.link.includes("https://")) {
    productLink = "https://" + product.link;
  } else {
    productLink = product.link;
  }
  console.log(product.link);
  return (
    <Card
      border="light"
      style={{
        width: "16rem",
        display: "inline-block",
        maxHeight: "20rem",
        margin: "1.1%",
        borderRadius: "12px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      <Card.Body>
        {hostname != null ? (
          <Card.Text
            className="regular"
            style={{ fontSize: "16px", color: "#A8A8A8" }}
          >
            {" "}
            {hostname.toUpperCase()}{" "}
          </Card.Text>
        ) : (
          <Card.Text
            className="regular"
            style={{ fontSize: "16px", color: "#A8A8A8" }}
          >
            {" "}
            {hostname}{" "}
          </Card.Text>
        )}
        {product.title.length < 26 ? (
          <Card.Title style={{ height: "47px" }} className="regular">
            <a
              style={{ fontSize: "20px", color: "#212121" }}
              href={productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {product.title}{" "}
            </a>
          </Card.Title>
        ) : (
          <Card.Title className="regular">
            <a
              style={{ fontSize: "20px", color: "#212121" }}
              href={productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {product.title.substring(0, 30) + "..."}{" "}
            </a>
          </Card.Title>
        )}
        <Card.Text className="regular">
          <img
            id={product.objectID}
            src={product.imageLink}
            alt={product.title.substring(0, product.title.length - 1)}
            width="70px"
            height="70px"
          />
        </Card.Text>
        <Card.Text
          className="regular"
          style={{ fontSize: "18px", color: "#767676" }}
        >
          {" "}
          {product.description.substring(0, 35) + "..."}{" "}
        </Card.Text>
        <Card.Text
          className="bold"
          style={{ fontSize: "20px", color: "#009FE3" }}
        >
          {" "}
          {product.price} CZK
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
