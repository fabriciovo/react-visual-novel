import "./style.css";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackground } from "../../Redux/backgroundSlice";
import { changeCodeButtons } from "../../Redux/phaserSlice";
import { changeDialog, selectDialogBox } from "../../Redux/dialogBoxSlice";
export default function DialogBox({ dialogs, choices, codeChallenge }) {
  const dispatch = useDispatch();
  const { dialog } = useSelector(selectDialogBox);
  const [showChoices, setShowChoices] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    dispatch(changeBackground(dialogs[dialog]?.background));
  }, []);

  useEffect(() => {
    if (dialog === 0) {
      setTip(false);
    }
  }, [dialog]);

  function nextDialog() {
    const size = dialogs.length - 1;

    if (size === dialog) {
      if (choices) {
        setShowChoices(true);
      }
      if (codeChallenge) {
        setTip(true);
        dispatch(changeCodeButtons(true));
      }
      return;
    }
    dispatch(changeDialog(dialog + 1));
    background();
  }

  function backDialog() {
    if (0 === dialog) return;
    dispatch(changeDialog(dialog - 1));
    background();
  }

  function background() {
    if (dialogs[dialog]?.nextBackground) {
      dispatch(changeBackground(dialogs[dialog]?.background));
    }
  }

  function renderBackNextButtons() {
    return (
      <div className={"buttonContainer"}>
        {!showChoices && (
          <Fragment>
            <div>
              {dialog > 0 && <button onClick={() => backDialog()}>Back</button>}
            </div>
            <div>
              <button onClick={() => nextDialog()}>Next</button>
            </div>
          </Fragment>
        )}
      </div>
    );
  }

  function renderChoices() {
    return (
      <div>
        <div>
          <p>
            <b>Escolhas</b>
          </p>
        </div>
        {choices.choiceDialog?.map(({ choiceText, choiceGoTo }) => (
          <div key={choiceGoTo}>
            <a href={`/Game/${choiceGoTo}`}>{choiceText}</a>
          </div>
        ))}
      </div>
    );
  }

  function renderTip() {
    return (
      <div>
        <div>
          <p>
            <b>Dica</b>
          </p>
          <p>{codeChallenge?.codeTip}</p>
        </div>
      </div>
    );
  }

  function renderDialog() {
    return (
      <div>
        <p>
          <img
            width={80}
            height={80}
            alt={dialogs[dialog]?.characterName}
            src={dialogs[dialog]?.characterImage}
            style={{ imageRendering: "pixelated" }}
          />
          <b>{dialogs[dialog]?.characterName}</b>
        </p>
        <p>{dialogs[dialog]?.characterDialog}</p>
      </div>
    );
  }

  return (
    <div className={"card"}>
      {showChoices && renderChoices()}
      {!showChoices && renderDialog()}
      {tip && renderTip()}
      {!tip && renderBackNextButtons()}
    </div>
  );
}
