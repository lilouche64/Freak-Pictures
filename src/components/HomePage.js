import React from 'react';
import Unsplash from 'unsplash-js';
import Card from './Card';
import Styled from 'styled-components';
import qs from 'qs';
import {Link} from 'react-router-dom';

const Container = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    width: 100%;
    
    .photo{
        margin : 4px
    }
    img{
        border-radius : 15px;
        width : 100%;
    }
    div:last-child {
        text-align: center;
        flex-basis: 100%;
    }
`; 

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        
        //Recuperer le parametre page dans l'url
        const { page } = qs.parse(this.props.location.search.replace('?', ''));
        //Verification si page existe, il le transforme en nb, si non il affiche la 1ere page
        const pageNumber = page ? parseInt(page) : 1;
        console.log('HomePage#contrustor page', page);
        console.log('HomePage#contrustor pageNumber', pageNumber);
        
        this.state={
            isLoading : true,
            isError: false,
            pictures :[],
            page : pageNumber,
            totalPage : 11
        }
    }

    //--------------------ComponentDidMount appelle la Fn getPicture----------------------------

    componentDidMount(){
        this.getPictures()
    }   
    
    //-------------------getPictures-----------------------------------------------------

    getPictures(){
        if (this.state.isLoading === false) {
            this.setState({
              isLoading: true
            });
        }

        const unsplash = new Unsplash({
            applicationId: "e9cc5cd8be789b1c47b6ec739c6d06f66342b231a4733873e06d1275cd0a3f6d",
            secret: '3c1d937b2b09d6f901b77177b71e729a6dcfd653ebc3731f1f26fc8815ff5b34'
        });
        // console.log('HomePage#unsplash', unsplash);

        return unsplash.photos.listPhotos(this.state.page, 30, "latest")
        .then(res => res.json())
        .then(data => {
            console.log("data", data);
            this.setState({
                pictures : data,
                isLoading : false,
            });
        }).catch((err)=>{
            this.setState({
                isError: true
            })
        });
    }
//------------------FN onChangePage change le state et reexcute le fetch-------------------------------------------------

    onChangePage(page) {
        console.log('HomePage#onChangePage', page);
        console.log('HomePage#onChangePage this.state.page #1', this.state.page);
        this.setState({
          page
        }, () => {
          this.getPictures();
        });
        console.log('HomePage#onChangePage this.state.page #2', this.state.page);
      }
      //La fn getPicture est a l'interieur du setState pour s'assurer qu'elle s'excuste apres le changement du state

//------------------------------------renderLink---------------------------------------

    renderLink(){
        const newTotalPage = []
        for(let i = 1; i <= this.state.totalPage; i++){
            newTotalPage.push(
                <Link 
                    to={`/?page=${i}`}
                    onClick={()=>{
                        this.onChangePage(i)
                    }}>
                    <button>{i}</button>
                </Link>)
        }
        return newTotalPage;
    }
//----------------------------------------render-----------------------------------------

    render() {
        if (this.state.isError === true) {
            return (
              <p>Erreur serveur</p>
            );
        }
        if (this.state.isLoading === true) {
            return (
              <p>Chargement...</p>
            );
        }
      
        if (this.state.pictures.length === 0) {
            return (
            <p>Aucun résultat</p>
            );
        }
        return(
            <Container>
                {this.state.pictures.map((picture, id)=>{
                    return(
                        <Card
                            key={id}
                            picture={picture}
                        />
                    );
                })}
                <div>
                    {this.renderLink()}
                </div>
            </Container>      
        );
    }
}
export default HomePage;
