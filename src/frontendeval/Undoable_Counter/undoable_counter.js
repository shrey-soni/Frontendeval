import React from "react";

class UndoableCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      historyList: [],
      undoStack: [],
      redoStack: []
    };
    this.countVal = 0;
    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
  }

  // functionality
  removeFromHistory() {
    let newHistoryList = this.state.historyList;
    newHistoryList.pop();
    this.setState({
      historyList: newHistoryList
    });
  }

  addToHistory(historyItem) {
    let newHistoryList = this.state.historyList;
    newHistoryList.push(historyItem);
    this.setState({
      historyList: newHistoryList
    });
  }

  onUndo() {
    let undoList = this.state.undoStack;
    if (undoList.length > 0) {
      let popped = undoList.pop();
      let redoList = this.state.redoStack;
      redoList.push(popped);
      this.countVal -= popped;
      this.setState({
        undoStack: undoList,
        redoStack: redoList,
        count: this.countVal
      });
    }
  }

  onRedo() {
    let redoList = this.state.redoStack;
    if (redoList.length > 0) {
      let popped = redoList.pop();
      let undoList = this.state.undoStack;
      undoList.push(popped);
      this.countVal += popped;
      this.setState({
        undoStack: undoList,
        redoStack: redoList,
        count: this.countVal
      });
    }
  }

  addToUndo(amount) {
    let undoList = this.state.undoStack;
    undoList.push(amount);
    this.setState({
      undoStack: undoList
    });
  }

  modifyCount(amount) {
    let prevAmount = this.countVal;
    this.countVal += amount;
    this.setState({
      count: this.countVal
    });
    this.addToHistory({
      updatedBy: amount,
      changelog: "(" + prevAmount + " -> " + this.countVal + ")"
    });
    this.addToUndo(amount);
  }

  //rendering
  getButton(onClick, buttonText, isDisabled) {
    return (
      <button
        className={`uc_btn_${buttonText}`}
        onClick={onClick}
        key={buttonText}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
    );
  }

  getHistoryItem(item, index) {
    return (
      <div className="uc_history_item" key={"" + item + index}>
        <div>{item.updatedBy}</div>
        <div>{item.changelog}</div>
      </div>
    );
  }

  getModifiers(isPositive) {
    let value = isPositive ? 1 : -1;
    const classname = isPositive?"uc_modifiers uc_m_positive":"uc_modifiers";
    let modifierElement = <div className={classname} key={"" + value}>
      {this.getButton(() => {
        this.modifyCount(value * 100);
      }, value * 100)}
      {this.getButton(() => {
        this.modifyCount(value * 10);
      }, value * 10)}
      {this.getButton(() => {
        this.modifyCount(value * 1);
      }, value * 1)}
    </div>;
    return modifierElement;
  }

  render() {
    return (
      <div id="undoable_counter" className="undoable_counter">
        <div className="uc_title">Undoable Counter</div>
        <div className="uc_undo_redo_btns">
          <div className="uc_undo">
            {this.getButton(
              this.onUndo,
              "Undo",
              this.state.undoStack.length === 0
            )}
          </div>
          <div className="uc_redo">
            {this.getButton(
              this.onRedo,
              "Redo",
              this.state.redoStack.length === 0
            )}
          </div>
        </div>
        <div className="uc_count_modifiers">
          {this.getModifiers(false)}
          <div className="uc_counter">{this.state.count}</div>
          {this.getModifiers(true)}
        </div>
        <div className="uc_history">
          <div className="uc_history_title">History</div>
          <div className="uc_history_list">
            {this.state.historyList.reverse().map((item, index) => {
              return this.getHistoryItem(item, index);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default UndoableCounter;
