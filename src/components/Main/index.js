import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import questions from '../../constants/data.json';

import {
  //CATEGORIES,
  NUM_OF_QUESTIONS,
  //DIFFICULTY,
  //QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

const Main = ({ startQuiz }) => {
  const [category] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(60);
  const [difficulty] = useState('0');
  const [questionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 3600,
    minutes: 1800,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  //const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchDataL = () => {
    const results = questions.sort(() => 0.5 - Math.random());
    let selectn = numOfQuestions
    if(selectn>results.length){
      selectn=results.length
    }
    let selection = results.slice(0, numOfQuestions);

    selection.forEach(element => {
      element.options = shuffle([
        element.correct_answer,
        ...element.incorrect_answers,
      ]);
    });

    setProcessing(false);
    startQuiz(
      selection,
      countdownTime.hours + countdownTime.minutes + countdownTime.seconds
    );
  }

  // const fetchData = () => {
  //   setProcessing(true);

  //   if (error) setError(null);

  //   const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

  //   fetch(API)
  //     .then(respone => respone.json())
  //     .then(data =>
  //       setTimeout(() => {
  //         const { response_code, results } = data;

  //         if (response_code === 1) {
  //           const message = (
  //             <p>
  //               The API doesn't have enough questions for your query. (Ex.
  //               Asking for 50 Questions in a Category that only has 20.)
  //               <br />
  //               <br />
  //               Please change the <strong>No. of Questions</strong>,{' '}
  //               <strong>Difficulty Level</strong>, or{' '}
  //               <strong>Type of Questions</strong>.
  //             </p>
  //           );

  //           setProcessing(false);
  //           setError({ message });

  //           return;
  //         }

  //         results.forEach(element => {
  //           element.options = shuffle([
  //             element.correct_answer,
  //             ...element.incorrect_answers,
  //           ]);
  //         });

  //         setProcessing(false);
  //         startQuiz(
  //           results,
  //           countdownTime.hours + countdownTime.minutes + countdownTime.seconds
  //         );
  //       }, 1000)
  //     )
  //     .catch(error =>
  //       setTimeout(() => {
  //         if (!navigator.onLine) {
  //           setOffline(true);
  //         } else {
  //           setProcessing(false);
  //           setError(error);
  //         }
  //       }, 1000)
  //     );
  // };

  //if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>Generator vprašanj za radioamatersko licenco razred A</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Napaka!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                {/* <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
                <br /> */}
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Število vprašanj"
                  header="Število vprašanj"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                {/* <Dropdown
                  fluid
                  selection
                  name="difficulty"
                  placeholder="Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  fluid
                  selection
                  name="type"
                  placeholder="Select Questions Type"
                  header="Select Questions Type"
                  options={QUESTIONS_TYPE}
                  value={questionsType}
                  onChange={(e, { value }) => setQuestionsType(value)}
                  disabled={processing}
                />
                <br /> */}
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Ure"
                  header="Ure"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Minute"
                  header="Minute"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Sekunde"
                  header="Sekunde"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Procesiram...' : 'Začni'}
                  onClick={fetchDataL}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
