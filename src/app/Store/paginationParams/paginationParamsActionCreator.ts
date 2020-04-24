// import React from 'react'
// import { Store } from "../Store";

// export const useNextPage = () => {
//     const {
//       paginationParams,
//       dispatchPaginationParams,
//       dispatchPostData,
//       dispatchAppState,
//     } = React.useContext(Store);
//     return async () => {
//         const res = await fetch(`http://localhost:3000/post_data/get`);
//         const data = await res.json();
//         if (data.err === true) {
//             alert("投稿できませんでした");
//         } else {
//             dispatchPaginationParams({'SET_PAGINATION_PARAMS', payload: })
            
        
//         };
        
        
//     }
// }