// import React from "react";

// class GridCard extends React.Component{
//     render() {
//         const {collection} = this.props
//         return(
//             <div>
//                 <h3>{collection.title}</h3>
//                 <img src={collection.cover_photo.urls.small} alt=''/>
//                 <p>{collection.cover_photo.alt_description}</p>
//                 <img src={collection.cover_photo.user.profile_image.small} alt=''/>
//                 <p>{collection.total_photos} photos . Curated by {collection.cover_photo.user.name}</p>
//                 {collection.tags.map((tag, index)=>{
//                     return(
//                         <div key={index}>
//                         {tag.title}
//                         </div>   
//                     )}
//                  )}
                

//             </div>
//         )
//     }
// }
// export default GridCard;