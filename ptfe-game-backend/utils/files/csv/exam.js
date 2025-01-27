const QuestionCategory = require("../../../models/questionCategoriesModel");
const Question = require("../../../models/questionModel");
const ExamCategory = require("../../../models/examCategoriesModel");

/**
 * Convert CSV data to JSON for exam import.
 *
 * @desc Parses a CSV string and converts it into a JSON structure suitable for importing exams.
 * @param {string} csv - The CSV data to be converted.
 * @returns {Array} - An array of exam sections in JSON format.
 */

const convertExamCsvToJson = async (csv) => {
  const csvArr = csv.split("\n").filter(section => section.trim() !== '');

  const exams = {};

  for (const [index, csvSection] of csvArr.entries()) {
    if(index === 0) continue;
    let splitCsvSection = csvSection.split(',')

    const examName = splitCsvSection[0];
    const examCategoryCsv = splitCsvSection[1];
    const examDurationCsv = splitCsvSection[2];
    const sectionName = splitCsvSection[3];
    const categoryName = splitCsvSection[4];
    let subcategories = [splitCsvSection[5], splitCsvSection[6], splitCsvSection[7]];
    const questionCsv = splitCsvSection[8];
    let answers = [splitCsvSection[9], splitCsvSection[10], splitCsvSection[11], splitCsvSection[12], splitCsvSection[13]];
    const correctAnswer = splitCsvSection[14];
    const answerExplanation = splitCsvSection[15];

    const examCategory = await ExamCategory.findOne({name: examCategoryCsv});

    //If the exam doesn't exist, create it
    if(!exams[examName]) {
      exams[examName] = {
        category: examCategory,
      }
    }

    //If the section doesent exist create it
    if(!exams[examName].sections) {
      exams[examName].sections = [];
    }

    //If the section doesen't exist create it
    if (!exams[examName].sections.find(section => section.name === sectionName)) {
      exams[examName].sections.push({ name: sectionName, isActive: true, duration: parseInt(examDurationCsv), questions: [] });
    } 

    let section = exams[examName].sections.find(section => section.name === sectionName);

    const categories = [];
    const category = await QuestionCategory.findOne({name: categoryName});
    if(category) {
      subcategories = subcategories.filter(subcategory => category.subcategories.includes(subcategory));
      categories.push({category: category._id, subcategories});
    }

    answers = answers.filter(answer => answer !== '').map((answer, index) => {
      let correct = false;
    
      if (index === parseInt(correctAnswer - 1)) {
        correct = true;
      }
    
      return {
        answer,
        correct
      };
    });


    let question = await Question.findOne({question: questionCsv});
    if(!question) {
      const newQuestionObject = {
        question: questionCsv,
        categories,
        answers,
        answerExplanation,
        examCategory: examCategory._id,
        isActive: true
      };

      question = await Question.create(newQuestionObject)
    }
    if(!section.questions.find(examQuestion => examQuestion === question._id)) {
      section.questions.push(question._id.toString());
    }
  }
  return exams;
}

module.exports =  {
  convertExamCsvToJson
}