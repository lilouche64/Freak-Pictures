import React from "react";
import { Link } from 'react-router-dom';
import Styled from 'styled-components';


const Container = Styled.div`

    header {
        width: 100%;
        height: 75vh;
        background: url(https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Beautiful-Full-HD-Wallpaper-Download-Free-PIC-WPE0010098.jpg) no-repeat 50% 50%;
        background-size: cover;
        margin-bottom : 60px;
    }

    .content {
        width: 94%;
        margin: 4em auto;
        font-size: 20px;
        line-height: 30px;
        text-align: justify;
    }

    .logo h1{
        line-height: 60px;
        position: fixed;
        float: left;
        margin: 16px 46px;
        color: #fff;
        font-weight: bold;
        font-size: 24px;
        letter-spacing: 2px;
    }

    nav {
        position: fixed;
        width: 100%;
        line-height: 60px;
    }

    nav ul {
        line-height: 60px;
        list-style: none;
        background: rgba(0, 0, 0, 0);
        overflow: hidden;
        color: #fff;
        padding: 0;
        text-align: right;
        margin: 0;
        padding-right: 40px;
        transition: 1s;
        display: flex;
    }

    nav ul li {
        padding: 16px 40px;
        flex: initial;
    }

    nav ul li:first-child{
        flex: auto;
    }

    li input{
        width:70%;
        // padding: 10px;
    }
    .menu{
        display:block;
    }

    nav ul li a {
        text-decoration: none;
        color: #fff;
        font-size: 16px;
    }
    
    .menu-icon {
        line-height: 60px;
        width: 100%;
        background: #000;
        text-align: right;
        box-sizing: border-box;
        padding: 15px 24px;
        cursor: pointer;
        color: #fff;
        display: none;
    }
    .menu{
        display: block
    }
    @media(max-width: 900px) {

        .logo h1 {
              position: fixed;
              top: 0;
              margin-top: 16px;
        }
        .menu{
            display: none
        }
        nav ul {
              max-height: 34em;
              background: #000;
              display:flex;
              flex-wrap:wrap;
              flex-direction:colum;
        }
  
        nav ul li {
              box-sizing: border-box;
              width: 100%;
              padding: 24px;
              text-align: center;
        }

        .menu-icon {
              display: block;
        }    
    }

`;

class Nav extends React.Component {

    state = {
        keyword: "",
        isReady : false,
        isScrolled : false,
        isDisplay: false,
    }
    //---------------Component didMount--------------------------------------------
    componentDidMount() {
        window.onscroll = this.onScroll.bind(this);

    }

    //---------------Fn onScroll----------------------------------------------------

    onScroll() {
        console.log("Nav#onScroll", window.scrollY);
        if(parseInt(window.scrollY) > 100 && this.state.isScrolled !== true){
            this.setState({
                isScrolled: true
            })
        }
        if (parseInt(window.scrollY) < 100 && this.state.isScrolled === true) {
            this.setState({
                isScrolled: false
            })
        }
    }

    //---------------------onChangeKeyWord----------------------------------------

    onChangeKeyWord(keyword) {
        // console.log(">> App#onChangeKeyWord");
        console.log("Nav#onChangeKeyWord keyWord", keyword);

        this.setState({
            keyword
        });
        console.log("<< Nav#onChangeKeyWord");
    }

    //-----------------------Render--------------------------------------------------

    render() {
        console.log('Nav#this.props', this.props);
        return (
            <Container className="wrapper">
                <header>
                    <nav 
                        style={{
                            backgroundColor: this.state.isScrolled ? '#000' : 'transparent'  
                        }}>
                        <div className="menu-icon" onClick={()=>{
                            // console.log('@nav menu isdisplay', this.state.isDisplay);
                            this.setState({
                                isDisplay: this.state.isDisplay === false ? true : false
                            })

                        }}>
                            <i className="fa fa-bars fa-2x"></i>
                        </div>
                        <div className="logo">
                            <Link to='/'><h1>Freak Pictures</h1></Link>
                        </div>
                        <div className="menu"
                        style={{
                            display: this.state.isDisplay ? 'none' : 'block'
                        }}
                        >
                            <ul>
                                <li>
                                    <input
                                        type="search"
                                        name="searchKeyword"
                                        placeholder="Search free high-resolution photos"
                                        value={this.state.keyword}
                                        onChange={(event) => {
                                            this.onChangeKeyWord(event.target.value)
                                            console.log("event", event)
                                        }}
                                    />
                                    <Link to={`/search?keyword=${this.state.keyword}`}>
                                        <button>Submit</button>
                                    </Link>
                                </li>
                                <li><Link to='/'>Home</Link></li>
                                {/* <li><Link to='/collections'>Collection</Link></li> */}
                            </ul>
                        </div>
                    </nav>
                </header>
            </Container>
        );
    }
}

Nav.defaultProps = {
    onClick: () => { }
}

//Si le composant ne renvoie pas de Fn, ça prendra une valeur par defaut et c;est une Fn vide
export default Nav;