// import React from 'react';
// import Unsplash from 'unsplash-js';
// // import qs from 'qs';
// import GridCard from "./GridCard";


// class CollectionPage extends React.Component{
//     constructor(props){
//         super(props);

//         // const {page, collections} = qs.parse(this.props.location.search.replace('?', ''));
//         // console.log('HomePage#contrustor page', page);
//         // const pageNumber = page ? parseInt(page) : 1;
//         // console.log('HomePage#contrustor pageNumber', pageNumber);

//         this.state={
//             // collections,
//             isLoading : true,
//             isError : false,
//             // page : pageNumber,
//             page : 1,
//             perPage : 30,
//             totalPage : 12,
//             collections : []
//         }
//     }

//     //---------------------ComponentDidMount----------------------------------------

//     componentDidMount(){
//         this.getColletcions()
//     }

//     //----------------------Fn getCollections ---------------------------------------
    
//     getColletcions() {
//         if (this.state.isLoading === false) {
//             this.setState({
//               isLoading: true
//             });
//         }
        
//         const unsplash = new Unsplash({
//             applicationId: "e9cc5cd8be789b1c47b6ec739c6d06f66342b231a4733873e06d1275cd0a3f6d",
//             secret: '3c1d937b2b09d6f901b77177b71e729a6dcfd653ebc3731f1f26fc8815ff5b34'
//         });
//         console.log('collection#unsplash', unsplash);

//         return unsplash.collections.listCollections(this.state.page, this.state.perPage, "")
//         .then(res => res.json())
//         .then(data => {
//             console.log('collection#data', data);
//             this.setState({
//                 collections : data,
//                 isLoading : false
//             });
//         }).catch((err)=>{
//             this.setState({
//                 isError : true
//             })
//         })
//     }

//     //--------------------Render------------------------------------------------
//     render() {
//         console.log('CollectionPage#this.state', this.state);
//         if (this.state.isError === true) {
//             return (
//               <p>Erreur serveur</p>
//             );
//         }
//         if (this.state.isLoading === true) {
//             return (
//               <p>Chargement...</p>
//             );
//         }
      
//         if (this.state.collections.length === 0) {
//             return (
//             <p>Aucun résultat</p>
//             );
//         }
       
//         return(
//             <div>
//                 <h3>Collection</h3>
//                 {this.state.collections.map((collection, index)=>{
//                     return(
//                         <GridCard
//                             key={index}
//                             collection={collection}
//                         />
//                     )
//                 })}
//             </div>
//         );
//     }
// }
// export default CollectionPage;