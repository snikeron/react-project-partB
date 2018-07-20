import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


class Preference extends Component {
    constructor(props) {
      super(props)

      this.state = {
        priority: this.props.priority,
        items: items
      }

      this.onDragEnd = this.onDragEnd.bind(this)
      
    }
  
    onDragEnd(result) {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
  
      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      )
  
      this.setState({
        items
      })

      this.props.raiseData(this.state.items)

    }
  
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
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
                  {this.state.items.map((item, index) => (
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
  


  const items = [
    {
      id: "item-1",
      content: "Technologies"
    },
    {
      id: "item-2",
      content: "Salary"
    },
    {
      id: "item-3",
      content: "Location"
    },
    {
      id: "item-4",
      content: "Job Title"
    },
    {
      id: "item-5",
      content: "Role Responsibilities"
    },
    {
      id: "item-6",
      content: "Training and Professional Development"
    },
    {
      id: "item-7",
      content: "The Team"
    },
    {
      id: "item-8",
      content: "Office Environment"
    },
    {
      id: "item-9",
      content: "The Company’s Purpose and Products"
    },
    {
      id: "item-10",
      content: "Management"
    },
    {
      id: "item-11",
      content: "The Hours"
    },
    {
      id: "item-12",
      content: "Ability to work from home"
    },
    {
      id: "item-13",
      content: "Travel (work related as a consistent part of the role)"
    }
  ];
  
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
      "border-radius": "3px",
    
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