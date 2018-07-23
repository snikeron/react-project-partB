import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


class Preference extends Component {
    constructor(props) {
      super(props)

      this.state = {
        priority: this.props.priority
      }

      this.onDragEnd = this.onDragEnd.bind(this)
      
    }
  
    onDragEnd(result) {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
  
      const priority = reorder(
        this.state.priority,
        result.source.index,
        result.destination.index
      )

      this.setState({
        priority
      })

      this.props.raiseData(this.state.priority)

    }
  
    render() {

      return (
        <div className="">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className={"dnd flex-item"}
                >
                  {this.state.priority.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={itemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      );
    }
  }
  
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };
    
    const grid = 8;
    
    const itemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,
      borderRadius: "12px",
    
      // change background colour if dragging
      background: isDragging ? "dodgerblue" : "#FF7900",
    
      // styles we need to apply on draggables
      ...draggableStyle
    });
    
    const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? "lightgrey" : "#fff",
      padding: grid,
      width: 250,
      border: "solid 0.5px lightgrey",
      margin: "1.5em"
    });


  export default Preference