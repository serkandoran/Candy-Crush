
const container = document.querySelector('.container')
let shapes = []


let colorreplace
let dragDiv
let globali
let globalj
let colors = ['rgb(173, 130, 212)','lightblue','coral','rgb(214, 212, 66)','rgb(40, 160, 40)']

setCon()
function setCon(){
   for(let i=0; i<10; i++){
      shapes.push([])
      for(let j=0; j<9; j++){
         let div = document.createElement('div')
         let randomColor = Math.floor(Math.random()*5)
         
         if(i === 0 && j>0){
            while(colors[randomColor] === shapes[i][j-1].style.background){
               randomColor = Math.floor(Math.random()*5)
            }
         }else if(i>0 && j==0){
            while(colors[randomColor] === shapes[i-1][j].style.background){
               randomColor = Math.floor(Math.random()*5)
            }
         }else if(i>0 && j>0){
            while(colors[randomColor] === shapes[i-1][j].style.background || colors[randomColor] === shapes[i][j-1].style.background){
               randomColor = Math.floor(Math.random()*5)
            }
         }

         div.style.background = `${colors[randomColor]}`
         div.draggable = true
         shapes[i][j] = div
         container.appendChild(div)

         div.addEventListener('dragstart',()=>{
            dragDiv = div
            colorreplace = div.style.background
            globali = i
            globalj = j
         })
         div.addEventListener('dragover',(e)=>{
            e.preventDefault()
         })
         div.addEventListener('drop',()=>{
            if(Math.abs((i-globali)+(j-globalj)) ===1){
               let dragDivColor = dragDiv.style.background
               let dropDivColor = div.style.background
               dragDiv.style.background = div.style.background
               div.style.background = colorreplace

               if(!checkTable(shapes)){
                  dragDiv.style.background = dragDivColor
                  div.style.background = dropDivColor
               }else{
                  while(checkTable(shapes)){
                     checkTable(shapes)
                  }
               }

            }
         })
      }
   }
}

function checkTable(ar){
   let sonuc = false
   for(let i=0; i<ar.length; i++){
      for(let j=0; j<ar[i].length;j++){
         if(j<5){
            if(ar[i][j].style.background == ar[i][j+1].style.background && ar[i][j].style.background == ar[i][j+2].style.background && ar[i][j].style.background == ar[i][j+3].style.background && ar[i][j].style.background == ar[i][j+4].style.background){
               if(ar[i][j].style.background != ''){
                  ar[i][j].style.background = ''
                  ar[i][j+1].style.background = ''
                  ar[i][j+2].style.background = ''
                  ar[i][j+3].style.background = ''
                  ar[i][j+4].style.background = ''
                  sonuc=true
               }
            }
         }
         if(j<6){
            if(ar[i][j].style.background != ''){
               if(ar[i][j].style.background == ar[i][j+1].style.background && ar[i][j].style.background == ar[i][j+2].style.background && ar[i][j].style.background == ar[i][j+3].style.background){
                  ar[i][j].style.background = ''
                  ar[i][j+1].style.background = ''
                  ar[i][j+2].style.background = ''
                  ar[i][j+3].style.background = ''
                  sonuc=true
               }
            }
         }
         if(j<7){
            if(ar[i][j].style.background != ''){
               if(ar[i][j].style.background == ar[i][j+1].style.background && ar[i][j].style.background == ar[i][j+2].style.background){
                  ar[i][j].style.background = ''
                  ar[i][j+1].style.background = ''
                  ar[i][j+2].style.background = ''
                  sonuc=true
               }
            }
         }
         if(i<6){
            if(ar[i][j].style.background != ''){
               if(ar[i][j].style.background == ar[i+1][j].style.background && ar[i][j].style.background == ar[i+2][j].style.background && ar[i][j].style.background == ar[i+3][j].style.background && ar[i][j].style.background == ar[i+4][j].style.background){
                  ar[i][j].style.background = ''
                  ar[i+1][j].style.background = ''
                  ar[i+2][j].style.background = ''
                  ar[i+3][j].style.background = ''
                  ar[i+4][j].style.background = ''
                  sonuc=true
               }
            }
         }
         if(i<7){
            if(ar[i][j].style.background != ''){
               if(ar[i][j].style.background == ar[i+1][j].style.background && ar[i][j].style.background == ar[i+2][j].style.background && ar[i][j].style.background == ar[i+3][j].style.background){
                  ar[i][j].style.background = ''
                  ar[i+1][j].style.background = ''
                  ar[i+2][j].style.background = ''
                  ar[i+3][j].style.background = ''
                  sonuc=true
               }
            }
         }
         if(i<8){
            if(ar[i][j].style.background != ''){
               if(ar[i][j].style.background == ar[i+1][j].style.background && ar[i][j].style.background == ar[i+2][j].style.background){
                  ar[i][j].style.background = ''
                  ar[i+1][j].style.background = ''
                  ar[i+2][j].style.background = ''
                  sonuc=true
               }
            }
         }
      }
   }
   skyFalls(ar)
   fillGaps(ar)
   return sonuc
}

function skyFalls(ar){
   for(let i=ar.length-1; i>=0; i--){
      for(let j=ar[i].length-1; j>=0; j--){
         
         if(i<9 && ar[i+1][j].style.background == '' && ar[i][j].style.background != ''){
            let color = ar[i][j].style.background
            ar[i][j].style.background = ''
            let idx = i
            while(ar[idx+1][j].style.background === ''){
               if(idx==8){
                  idx++
                  break
               }
               else if(idx<8) idx++
            }
            ar[idx][j].style.background = color
         }
      }
   }
}

function fillGaps(ar){
   for(let i=0; i<ar.length; i++){
      for(let j=0; j<ar[i].length;j++){
         if(ar[i][j].style.background == ''){
            let random = Math.floor(Math.random()*colors.length)
            ar[i][j].style.background = `${colors[random]}`
         }
      }
   }
}

