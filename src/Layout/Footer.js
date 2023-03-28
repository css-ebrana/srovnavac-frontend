import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Logo from '../logo.svg'
import "../css/style.css";

const Footer = () => {
    return (
        <MDBFooter id="mdbfooter" style={{ backgroundImage: "linear-gradient(to right, #009FE3, #00CADD)", color: "white" }} className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-center">
                <MDBRow>
                    <MDBCol md="12">
                        <a target="_blank" rel="noopener noreferrer" href="https://ebrana.cz/"><img src={Logo} alt="eBRÁNA logo" width="110px" height="70px" /></a>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3" style={{ fontSize: "17px" }}>
                <MDBContainer className="regular" fluid>
                    &copy; {new Date().getFullYear()} | podpora@ebrana.cz | +420 460 000 270
                </MDBContainer>
                <a className="regular" href="https://ebrana.cz/podminky-pouziti" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}><u>Podmínky užití</u></a> | <a className="regular" href="https://ebrana.cz/ochrana-osobnich-udaju" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}><u>Prohlášení o ochraně osobních údajů</u></a>
            </div>
        </MDBFooter>
    );
}

export default Footer;