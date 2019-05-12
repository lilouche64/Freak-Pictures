import React from "react";
import styled from "styled-components";
import Modal from 'react-modal';


const Container = styled.div`
    margin-bottom : 40px;
    img {
        width : 100%;     
    }
    .img_modal{
        background-color: black;
        text-align: center;
        margin-bottom: 40px;
        position: relative;
    }
    .img_modal img{
        width : 100%;
        margin:20px auto;
    }
    ${'' /* .img_modal i{
        font-size:1.5em;
        padding: 5px;
    } */}
    ${'' /* .img_modal span{
        color: white;
        position:absolute;
        top : 5px;
        left: 8px;

    } */}
    ${'' /* .img_modal span:hover{
        
        opacity: 0.2;
        color: white;
    } */}
    ${'' /* .far_fa-heart{
        color: red;
        font-size: 25px;
        padding-left: 30px;
        margin-right: 10px;
    } */}
    ${'' /* .photographer img{
        border-radius: 40px;
        margin-top :30px;
        width: 70px;
    } */}
    ${'' /* .photographer{
        padding: 20px;
        display : inline-block: 
    } */}
    ${'' /* .infos {
        position : absolute;
    } */}
    ${'' /* .infos .icon_heart, 
    .infos .photographer{
        display : inline-block: 
        color:white;
    } */}
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '80%',
        padding: 0,


        // minHeight: '100vh',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // fontSize: 'calc(10px + 2vmin)',
        // color: 'black',
        // width : '60%',
        // // height : '80%',
    }
};

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    render() {
        // console.log("Card#this.props", this.props);

    
        return (
            <Container  >
                <img src={this.props.picture.urls.small} alt="" onClick={this.openModal} />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="ModalContainer">
                        <div className="img_modal">
                            <span><i className="fas fa-times" onClick={this.closeModal}></i></span>
                            <img src={this.props.picture.urls.regular} alt="" />
                            <div className="infos">
                                <div className="icon_heart">
                                    <i className="far fa-heart"></i>
                                    <span>{this.props.picture.likes}</span>
                                </div>
                                <div className="photographer">
                                    <img src={this.props.picture.user.profile_image.medium} alt="" />
                                    <p>{this.props.picture.user.first_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Container>
        );
    }
}

export default Card;


