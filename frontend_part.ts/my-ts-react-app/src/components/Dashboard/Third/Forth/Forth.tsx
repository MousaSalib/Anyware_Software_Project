import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
  text: string;
  isCorrect: boolean;
  _id: string;
}

interface Question {
  text: string;
  options: Option[];
  _id: string;
}

interface Quiz {
  _id: string;
  title: string;
  updatedAt: string;
  questions: Question[];
}

const Forth: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<Error | null>(null);

  const handleOptionChange = (questionId: string, optionId: string, newIsCorrect: boolean) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) => ({
        ...quiz,
        questions: quiz.questions.map((question) =>
          question._id === questionId
            ? {
                ...question,
                options: question.options.map((option) =>
                  option._id === optionId ? { ...option, isCorrect: newIsCorrect } : option
                ),
              }
            : question
        ),
      }))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ quizzes: Quiz[] }>('http://localhost:8001/api/quiz');
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <i className='fa fa-spin fa-spinner' style={{"fontSize": "30px"}}></i>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="align-items-center d-flex justify-content-between border border-dark p-2 rounded">
        <h5 className=''>Quizzes</h5>
        <p className='text-primary'>All</p>
      </div>

      {quizzes.map((quiz) => (
        <div key={quiz._id} className="card mb-3 mt-1">
          <div className="row g-0 ps-4 p-3">
            <div className="col-md-12">
              {quiz.questions.map((question) => (
                <div key={question._id}>
                  <p className="card-text">{question.text} - {quiz.title} ?</p>

                  {question.options.map((option) => (
                    <div key={option._id}>
                      <p className="card-text">{option.text}</p>
                      <div className="form-check">
                        <input
                          type="radio"
                          id={`option-${option._id}-true`}
                          name={`option-${option._id}`}
                          className="form-check-input"
                          checked={option.isCorrect}
                          onChange={() => handleOptionChange(question._id, option._id, true)}
                        />
                        <label htmlFor={`option-${option._id}-true`} className="form-check-label">
                          True
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id={`option-${option._id}-false`}
                          name={`option-${option._id}`}
                          className="form-check-input"
                          checked={!option.isCorrect}
                          onChange={() => handleOptionChange(question._id, option._id, false)}
                        />
                        <label htmlFor={`option-${option._id}-false`} className="form-check-label">
                          False
                        </label>
                      </div>
                    </div>
                  ))}
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Forth;
