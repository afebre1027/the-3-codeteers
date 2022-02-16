

// var newHighScores = (localStorage.getItem("floppyhighScores")) || "";

// var oldHighScores = (localStorage.getItem("oldfloppyscores")) || "";
// console.log(newHighScores);
// console.log(oldHighScores);


// let postRoutes =[];

// if(newHighScores !== oldHighScores){
//     var newScores = JSON.parse(newHighScores);
    
//     for(i=0; i<newScores.length; i++){
//         var game = newScores[i].game;
//         var score = newScores[i].score;

//         postRoutes.push('/api/scores', {method: 'POST', body:JSON.stringify({game, score}), headers:{'Content-Type':'application/json'}});
//         sendScores(postRoutes);
//         var oldScores = newScores;
//         localStorage.setItem('oldfloppyscores', JSON.stringify(oldScores));
//     };

//     async function sendScores(){
//         const response = await Promise.all([
//             fetch('/api/scores', {
//                 method: 'DELETE',
//                 body:JSON.stringify({
//                     game:'floppy'
//                 }),
//                 headers:{
//                     'content-Type': 'application/json'
//                 }
//             }),

//             newScores.forEach(routes=>fetch('/api/scores',{
//                 method: 'POST',
//                 body:JSON.stringify({
//                     score: routes.score,
//                     game: routes.game
//                 }),
//                 headers:{
//                     'Content-Type': 'application/json'
//                 }
//             })),
//         ])
       
//         // if(response.ok){
//         //     document.location.reload();
//         // } else{
//         //     alert(response.statusText);
//         // }
//     }
// };

