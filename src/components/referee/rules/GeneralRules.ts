import { Piece, PieceType, Position, samePosition, TeamType } from "../../../Constants";

export const tileIsEmptyOrOccupiedByOpponent=(position:Position,boardState:Piece[],team:TeamType):boolean=>{
    return !tileisOccupied(position,boardState)||tileisOccupiedByOpponent(position,boardState,team);
  }
export const tileisOccupied=(position:Position,boardState:Piece[]):boolean=>{
    const piece=boardState.find((p)=>samePosition(p.position,position));
    if(piece){ 
      return true;
    }
    else{
      return false;
    }
  }
export const tileisOccupiedByOpponent=(position:Position,boardState:Piece[],team:TeamType):boolean=>{
    const piece=boardState.find((p)=>samePosition(p.position,position) && p.team!==team);
    if(piece){
      return true;
    }
    else{
      return false
    }
  }
export const isEnPassantMove=(
    initialPosition:Position,
    desiredPosition:Position,
    type:PieceType,
    team:TeamType,
    boardState:Piece[]):boolean=>{
    const pawnDirection=team===TeamType.OUR?-1:1;
    
    if(type===PieceType.PAWN){
      if((desiredPosition.x-initialPosition.x===-1 || desiredPosition.x-initialPosition.x===1) && desiredPosition.y-initialPosition.y===pawnDirection){
          const piece=boardState.find(
          (p)=>p.position.x===desiredPosition.x && 
          p.position.y===desiredPosition.y-pawnDirection && 
          p.enPassant
        );
       if(piece){
        return true;
       }
      }
    }
    
    return false;
  }
