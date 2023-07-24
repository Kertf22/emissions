/* eslint-disable @typescript-eslint/no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import "./App.css";
import Question_1 from "./questions/question_1";
import Question_2 from "./questions/question_2";
import { Question_3 } from "./questions/question_3";
import { Question_4 } from "./questions/question_4";
import { Question_5 } from "./questions/question_5";
import Question_6 from "./questions/question_6";
import Question_7 from "./questions/question_7";
import Question_8 from "./questions/question_8";
import Question_9 from "./questions/question_9";

export const Questions = () => {
    return (
        <>
            <div className="w-full  items-center  p-12 gap-8 flex flex-wrap h-full">
                <Question_1 />
                <Question_2 />
                <Question_3 />
                <Question_4 />
                <Question_5 />
                <Question_6 />
                <Question_7 />
                <Question_8 />
                <Question_9 />
            </div>
        </>
    )
}