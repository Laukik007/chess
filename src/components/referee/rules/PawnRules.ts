import { Piece, Position, samePosition, TeamType } from "../../../Constants";
import { tileisOccupied, tileisOccupiedByOpponent } from "./GeneralRules";

export const pawnMove=(
initialPosition:Position,
desiredPosition:Position,
team:TeamType,
boardState:Piece[]):
boolean=>{
  const specialRow=team===TeamType.OUR?6:1;
  const pawnDirection=team===TeamType.OUR?-1:1;
  //Movement Logic
  if(initialPosition.x===desiredPosition.x && initialPosition.y===specialRow && desiredPosition.y-initialPosition.y===2*pawnDirection){
    if(
      !tileisOccupied(desiredPosition,boardState) &&
      !tileisOccupied({x:desiredPosition.x,y:desiredPosition.y-pawnDirection},boardState)
    ){
      return true;
    }
  }else if(initialPosition.x===desiredPosition.x && desiredPosition.y-initialPosition.y===pawnDirection){
    if(!tileisOccupied(desiredPosition,boardState)){
      return true;
    }
  }

  //Attacking Logic
  else if(desiredPosition.x-initialPosition.x===-1 && desiredPosition.y-initialPosition.y===pawnDirection){
    console.log('upper/bottom left');
    if(tileisOccupiedByOpponent(desiredPosition,boardState,team)){
    //   console.log('we can strike the opponent'); 
      return true;
    }
  }else if(desiredPosition.x-initialPosition.x===1 && desiredPosition.y-initialPosition.y===pawnDirection){
    console.log('upper/bottom right');
    if(tileisOccupiedByOpponent(desiredPosition,boardState,team)){
    //   console.log('we can strike the opponent'); 
      return true;
    }
  }
return false;
}

export const getAllPossiblePawanMoves=(pawn:Piece,boardState:Piece[]):Position[]=>{
  const possibleMoves:Position[]=[];
  const specialRow=pawn.team===TeamType.OUR?6:1;
  const pawnDirection=pawn.team===TeamType.OUR?-1:1;

  const normalMove:Position={x:pawn.position.x,y:pawn.position.y+pawnDirection};
  const specialMove:Position={x:normalMove.x,y:normalMove.y+pawnDirection}
  const upperleftAttack:Position={x:pawn.position.x-1,y:pawn.position.y+pawnDirection}
  const upperRightAttack:Position={x:pawn.position.x+1,y:pawn.position.y+pawnDirection}
  const leftPostion:Position={x:pawn.position.x-1,y:pawn.position.y}
  const rightPostion:Position={x:pawn.position.x+1,y:pawn.position.y}

  if(!tileisOccupied(normalMove,boardState)){
    possibleMoves.push(normalMove);
    if(pawn.position.y===specialRow && !tileisOccupied(specialMove,boardState)){
      possibleMoves.push(specialMove)
    }
  }
  if(tileisOccupiedByOpponent(upperRightAttack,boardState,pawn.team)){
    possibleMoves.push(upperRightAttack);
  }else if(!tileisOccupied(upperRightAttack,boardState)){
    const rightPiece=boardState.find(p=>samePosition(p.position,rightPostion));
    if(rightPiece!=null  && rightPiece.enPassant){
      possibleMoves.push(upperRightAttack);
    }
  }
  if(tileisOccupiedByOpponent(upperleftAttack,boardState,pawn.team)){
    possibleMoves.push(upperleftAttack);
  }else if(!tileisOccupied(upperleftAttack,boardState)){
    const leftPiece=boardState.find(p=>samePosition(p.position,leftPostion));
    if(leftPiece!=null  && leftPiece.enPassant){
      possibleMoves.push(upperleftAttack);
    }
  }
  
  return possibleMoves;
}