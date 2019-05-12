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

class SearchPage extends React.Component{
    constructor(props) {
        super(props);
        
        const { page, keyword} = qs.parse(this.props.location.search.replace('?', ''));
        console.log('HomePage#contrustor page', page);
        const pageNumber = page ? parseInt(page) : 1;
        console.log('HomePage#contrustor pageNumber', pageNumber);
        
        this.state={
            keyword,
            isLoading : true,
            isError: false,
            page : pageNumber,
            totalPage : 11,
            pictures : []
        }
    }

    //--------------------ComponentDidMount appelle la Fn getPicture----------------------------

    componentDidMount(){
        this.getKeyword()
    }   
    
    //-------------------getPictures-----------------------------------------------------

    getKeyword(){
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

        return unsplash.search.photos(this.state.keyword, this.state.page)
        .then(res => res.json())
        .then(data => {
            console.log("SearchPage#data", data);
            this.setState({
                pictures : data.results,
                isLoading : false
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
          this.getKeyword();
        });
        console.log('HomePage#onChangePage this.state.page #2', this.state.page);
      }

// //------------------------------------renderLink---------------------------------------

    renderLink(){
        const newTotalPage = []
        if(this.state.totalPage > 0){
            for(let i = 1; i <= this.state.totalPage; i++){
                newTotalPage.push(
                    <Link 
                        to={`/search?keyword=${this.state.keyword}&page=${i}`}
                        onClick={()=>{
                            this.onChangePage(i)
                        }}>
                        <button>{i}</button>
                    </Link>)
            }
            return newTotalPage;
        }
    }
//----------------------------------------render-----------------------------------------

    render() {
        console.log("SearchPage#this.state.keyword=", this.state.keyword);
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
                {this.state.pictures.map((picture,index)=>{
                    return(
                        <Card
                            key={index}
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
export default SearchPage;
