import { Piece, Position, samePosition, TeamType } from "../../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileisOccupied, tileisOccupiedByOpponent } from "./GeneralRules";

export const rookMove=(
  initialPosition:Position,
  desiredPosition:Position,
  team:TeamType,
  boardState:Piece[]):
  boolean=>{
  if(initialPosition.x===desiredPosition.x){
    // console.log('moving vertically');
    for(let i=1; i<8; i++){
      let multiplier=(desiredPosition.y<initialPosition.y)?-1:1;
      let passedPostion:Position={x:initialPosition.x,y:initialPosition.y+(i*multiplier)}
      //console.log(passedPostion);
      if(samePosition(passedPostion,desiredPosition)){
        if(tileIsEmptyOrOccupiedByOpponent(passedPostion,boardState,team)){
          return true;
        }
      } 
      else{
        if(tileisOccupied(passedPostion,boardState)){
          break;
        }
      }
    }
  }
  if(initialPosition.y===desiredPosition.y){
    //console.log('moving horizontally');
    for(let i=1; i<8; i++){
      let multiplier=(desiredPosition.x<initialPosition.x)?-1:1;
      let passedPostion:Position={x:initialPosition.x+(i*multiplier),y:initialPosition.y}
      //console.log(passedPostion);
      if(samePosition(passedPostion,desiredPosition)){
        if(tileIsEmptyOrOccupiedByOpponent(passedPostion,boardState,team)){
          return true;
        }
      } 
      else{
        if(tileisOccupied(passedPostion,boardState)){
          break;
        }
      }
    }
  }

return false;
}

export const getAllPossibleRookMoves=(rook:Piece,boardState:Piece[]):Position[]=>{
  const possibleMoves:Position[]=[];
    for(let i=1; i<8; i++){
      const destination:Position={x:rook.position.x,y:rook.position.y+i}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,rook.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
    for(let i=1; i<8; i++){
      const destination:Position={x:rook.position.x,y:rook.position.y-i}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,rook.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
    for(let i=1; i<8; i++){
      const destination:Position={x:rook.position.x+i,y:rook.position.y}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,rook.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
    for(let i=1; i<8; i++){
      const destination:Position={x:rook.position.x-i,y:rook.position.y}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,rook.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
  return possibleMoves;
}