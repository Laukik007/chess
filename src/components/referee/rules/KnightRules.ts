import { Piece, Position, TeamType } from "../../../Constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove=(
  initialPosition:Position,
  desiredPosition:Position,
  team:TeamType,
  boardState:Piece[]):
  boolean=>{
  for(let i=-1; i<=1; i+=2){
    for(let j=-1; j<=1; j+=2){
      if(desiredPosition.y-initialPosition.y===2*i){
          if(desiredPosition.x-initialPosition.x===j){
            if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
              return true;
            }
          }   
      }

      if(desiredPosition.x-initialPosition.x===2*i){
          if(desiredPosition.y-initialPosition.y===j){
            if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
              return true;
            }
        }    
      }
    }
  }
return false;
}
export const getAllPossibleKnightMoves=(knight:Piece,boardState:Piece[]):Position[]=>{
  const possibleMoves:Position[]=[];
  for(let i=-1; i<=1; i+=2){
    for(let j=-1; j<=1; j+=2){
      const verticalMove:Position={x:knight.position.x+j,y:knight.position.y+i*2};
      const horizontalMove:Position={x:knight.position.x+i*2,y:knight.position.y+j};

      if(tileIsEmptyOrOccupiedByOpponent(verticalMove,boardState,knight.team)){
        possibleMoves.push(verticalMove)
      }
       if(tileIsEmptyOrOccupiedByOpponent(horizontalMove,boardState,knight.team)){
        possibleMoves.push(horizontalMove)
      }
    }
  }
  return possibleMoves;
}