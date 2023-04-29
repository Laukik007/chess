import React, { useRef, useState } from 'react'
import Referee from '../referee/Referee';
import Tile from '../Tile/Tile';
import './Chessboard.css'
import { VERTICAL_AXIS,HORIZONTAL_AXIS,Piece,PieceType,TeamType,intialBoardState,Position,GRID_SIZE,samePosition} from '../../Constants';
import { isEnPassantMove } from '../referee/rules/GeneralRules';

const Chessboard = () => {
  const[activePiece,setActivePiece]=useState<HTMLElement|null>(null);
  const [promtionPawan,setPromotionPawn]=useState<Piece>();
  const [pieces,setPieces]=useState<Piece[]>(intialBoardState);
  const [grabPosition,setGrabPosition]=useState<Position>({x:-1,y:-1})
  const chessboardRef =useRef<HTMLDivElement>(null);
  const modalRef=useRef<HTMLDivElement>(null);
  const referee =new Referee()


function updateValidMoves(){
   setPieces((currentPieces)=>{
    return currentPieces.map((p)=>{
      p.possibleMoves=referee.getValidMoves(p,currentPieces);
      return p;
    })
  })
}
function grabpiece(e:React.MouseEvent){
  updateValidMoves();
  const element=e.target as HTMLElement
  const chessboard=chessboardRef.current;
  if(element.classList.contains("chess-piece")&&chessboard){
    // console.log('e.clientX',e.clientX);
    // console.log('e.clientY',e.clientY);
    // console.log('chessboard.offsetLeft',chessboard.offsetLeft);
    // console.log('chessboard.offsetTop',chessboard.offsetTop);
    const grabX=Math.floor((e.clientX-chessboard.offsetLeft)/GRID_SIZE);
    const grabY=Math.floor((e.clientY-chessboard.offsetTop)/GRID_SIZE);
    setGrabPosition({x:grabX,y:grabY})
    const x=e.clientX-50;
    const y=e.clientY-50;
    element.style.position="absolute"
    element.style.left=`${x}px`;
    element.style.top=`${y}px`
    setActivePiece(element);
  }
}
function movepiece(e:React.MouseEvent){
  const chessboard=chessboardRef.current;
  if(activePiece&&chessboard){
    const minX=chessboard.offsetLeft-25;
    const minY=chessboard.offsetTop-25;
    const maxX=chessboard.offsetLeft+chessboard.clientWidth-75;
    const maxY=chessboard.offsetTop+chessboard.clientHeight-75;
    const x=e.clientX-40;
    const y=e.clientY-40;
    activePiece.style.position="absolute"
    if(x<minX){
      activePiece.style.left=`${minX}px`;
    }else if(x>maxX){
      activePiece.style.left=`${maxX}px`;
    }else{
      activePiece.style.left=`${x}px`;
    }
    if(y<minY){
      activePiece.style.top=`${minY}px`;
    }else if(y>maxY){
      activePiece.style.top=`${maxY}px`;
    }else{
      activePiece.style.top=`${y}px`;
    }

  } 
}
function droppiece(e:React.MouseEvent){
  const chessboard=chessboardRef.current
  if(activePiece&&chessboard){
    const x=Math.floor((e.clientX-chessboard.offsetLeft)/GRID_SIZE);
    const y=Math.abs(Math.floor((e.clientY-chessboard.offsetTop)/GRID_SIZE));
    const currentPiece=pieces.find((p)=>samePosition(p.position,grabPosition));
    if(currentPiece){
      const isvalidmove=referee.isValidMove(
        grabPosition,
        {x,y},
        currentPiece.type,
        currentPiece.team,
        pieces
      )
      const isEnpassantMove=isEnPassantMove(
        grabPosition,
        {x,y},
        currentPiece.type,
        currentPiece.team,
        pieces
      )
      const pawnDirection=currentPiece.team===TeamType.OUR?-1:1;
      if(isEnpassantMove){
        const updatedPieces=pieces.reduce((results,piece)=>{
          if(samePosition(piece.position,grabPosition)){
            piece.enPassant=false;
            piece.position.x=x;
            piece.position.y=y;
            results.push(piece)
          }else if(!samePosition(piece.position,{x,y:y-pawnDirection})){
            if(piece.type===PieceType.PAWN){
              piece.enPassant=false;
            }
            results.push(piece)
          }
          return results;
        },[] as Piece[])

        setPieces(updatedPieces);
      }
      else if(isvalidmove){
        //UPDATE PIECE POSITION
        const updatedPieces=pieces.reduce((results,piece)=>{
        if(samePosition(piece.position,grabPosition)){
          //SPECIAL MOVE
          piece.enPassant= (Math.abs(grabPosition.y-y)===2 && piece.type===PieceType.PAWN)
          piece.position.x=x;
          piece.position.y=y;

          let promotionRow=(piece.team===TeamType.OUR)? 0 : 7;
          
          if(y===promotionRow && piece.type===PieceType.PAWN){
           modalRef.current?.classList.remove('hidden')
           setPromotionPawn(piece)
          }
          results.push(piece);
        }else if(!samePosition(piece.position,{x,y})){
          if(piece.type===PieceType.PAWN){
            piece.enPassant=false;
          }
          results.push(piece)
        }
        return results;
      },[] as Piece[]);
        setPieces(updatedPieces);
      }
      else{
        //RESETS PIECE POSITION
        activePiece.style.position="relative";
        activePiece.style.removeProperty('top');
        activePiece.style.removeProperty('left');
      }
     
    }
    setActivePiece(null)
  }
  
}

function promotePawn(pieceType:PieceType){
  if(promtionPawan===undefined){
    return;
  }
  const updatedPieces=pieces.reduce((results,piece)=>{
    if(samePosition(piece.position,promtionPawan.position)){
      piece.type=pieceType
      const teamType=(piece.team===TeamType.OUR)?"b":"w";
      let image="";
      switch(pieceType){
        case PieceType.ROOK:{
          image="rook";
          break;
        }
        case PieceType.BISHOP:{
          image="bishop";
          break;
        }
        case PieceType.KNIGHT:{
          image="knight";
          break;
        }
        case PieceType.QUEEN:{
          image="queen";
          break;
        }
      }
      piece.image=`assets/${image}_${teamType}.png`

    }
    results.push(piece);
    return results;
  }, [] as Piece[])
    
  setPieces(updatedPieces)
  modalRef.current?.classList.add('hidden')
}

function promotionTeamType(){
  return (promtionPawan?.team===TeamType.OUR)?"b":"w";
}
let board=[];
for(let i=0; i<HORIZONTAL_AXIS.length;i++){
for(let j=0; j<VERTICAL_AXIS.length; j++){
    let number=i+j+2;
    const piece=pieces.find((p)=>samePosition(p.position,{x:j,y:i}))
    let image=piece?piece.image:'';
    let currentPiece=activePiece!==null?pieces.find(p=>samePosition(p.position,grabPosition)):undefined;
    let highlight=currentPiece?.possibleMoves?
    currentPiece.possibleMoves.some(p=>samePosition(p,{x:j,y:i})):false
    board.push(<Tile image={image} number={number} highlight={highlight}/>)
  }
}
return (
  <>
  <div id="pawn-promotion-modal" className='hidden' ref={modalRef}>
    <div className='modal-body'>
    <img alt='rook' onClick={()=>promotePawn(PieceType.ROOK)} src={`/assets/rook_${promotionTeamType()}.png`}/>
    <img alt='bishop' onClick={()=>promotePawn(PieceType.BISHOP)} src={`/assets/bishop_${promotionTeamType()}.png`}/>
    <img alt='knight' onClick={()=>promotePawn(PieceType.KNIGHT)} src={`/assets/knight_${promotionTeamType()}.png`}/>
    <img alt='queen' onClick={()=>promotePawn(PieceType.QUEEN)} src={`/assets/queen_${promotionTeamType()}.png`}/>
    </div>
  </div>
  <div onMouseMove={(e)=>movepiece(e)}
    onMouseDown={(e)=>grabpiece(e)} 
    onMouseUp={(e)=>{droppiece(e)}} 
    id="chessboard"
    ref={chessboardRef}
    >
    {board}
    </div>
</>
  
)
}

export default Chessboard