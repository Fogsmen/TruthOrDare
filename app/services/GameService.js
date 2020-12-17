import questions_eng from '../dumy-data/eng/questions.json';
import questions_rus from '../dumy-data/rus/questions.json';
import questions_spa from '../dumy-data/spa/questions.json';

const questions = {
	eng: questions_eng,
	rus: questions_rus,
	spa: questions_spa
};

import questions_mm_eng from '../dumy-data/eng/questions_mm.json';
import questions_mm_rus from '../dumy-data/rus/questions_mm.json';
import questions_mm_spa from '../dumy-data/spa/questions_mm.json';

const questions_mm = {
	eng: questions_mm_eng,
	rus: questions_mm_rus,
	spa: questions_mm_spa
};

import questions_mf_eng from '../dumy-data/eng/questions_mf.json';
import questions_mf_rus from '../dumy-data/rus/questions_mf.json';
import questions_mf_spa from '../dumy-data/spa/questions_mf.json';

const questions_mf = {
	eng: questions_mf_eng,
	rus: questions_mf_rus,
	spa: questions_mf_spa
};

import questions_ff_eng from '../dumy-data/eng/questions_ff.json';
import questions_ff_rus from '../dumy-data/rus/questions_ff.json';
import questions_ff_spa from '../dumy-data/spa/questions_ff.json';

const questions_ff = {
	eng: questions_ff_eng,
	rus: questions_ff_rus,
	spa: questions_ff_spa
};

import dares_eng from '../dumy-data/eng/dares.json';
import dares_rus from '../dumy-data/rus/dares.json';
import dares_spa from '../dumy-data/spa/dares.json';

const dares = {
	eng: dares_eng,
	rus: dares_rus,
	spa: dares_spa
};

import dares_mm_eng from '../dumy-data/eng/dares_mm.json';
import dares_mm_rus from '../dumy-data/rus/dares_mm.json';
import dares_mm_spa from '../dumy-data/spa/dares_mm.json';

const dares_mm = {
	eng: dares_mm_eng,
	rus: dares_mm_rus,
	spa: dares_mm_spa
};

import dares_mf_eng from '../dumy-data/eng/dares_mf.json';
import dares_mf_rus from '../dumy-data/rus/dares_mf.json';
import dares_mf_spa from '../dumy-data/spa/dares_mf.json';

const dares_mf = {
	eng: dares_mf_eng,
	rus: dares_mf_rus,
	spa: dares_mf_spa
};

import dares_ff_eng from '../dumy-data/eng/dares_ff.json';
import dares_ff_rus from '../dumy-data/rus/dares_ff.json';
import dares_ff_spa from '../dumy-data/spa/dares_ff.json';

const dares_ff = {
	eng: dares_ff_eng,
	rus: dares_ff_rus,
	spa: dares_ff_spa
};

export const QuestionDares = (gameType, lang = 'eng') => {
	switch (gameType) {
		case 'multi':
			return {
				questions: questions[lang],
				dares: dares[lang]
			};

		case 'mm':
			return {
				questions: questions_mm[lang],
				dares: dares_mm[lang]
			};
	
		case 'mf':
			return {
				questions: questions_mf[lang],
				dares: dares_mf[lang]
			};
		
		case 'ff':
			return {
				questions: questions_ff[lang],
				dares: dares_ff[lang]
			};

		default:
			return null;
	}
};

import dice_eng from '../dumy-data/eng/dice.json';
import dice_rus from '../dumy-data/rus/dice.json';
import dice_spa from '../dumy-data/spa/dice.json';

const dices = {
	eng: dice_eng,
	rus: dice_rus,
	spa: dice_spa
};

export const getDiceWords = (level, lang = 'eng') => {
	const result = dices[lang].filter(x => x.level === level);
	return result.length > 0 ? result[0] : [];
};

import eng_dares_hot_m from '../dumy-data/eng/dares_hot_m.json';
import eng_dares_hot_f from '../dumy-data/eng/dares_hot_f.json';
import eng_dares_soft_m from '../dumy-data/eng/dares_soft_m.json';
import eng_dares_soft_f from '../dumy-data/eng/dares_soft_f.json';

import rus_dares_hot_m from '../dumy-data/rus/dares_hot_m.json';
import rus_dares_hot_f from '../dumy-data/rus/dares_hot_f.json';
import rus_dares_soft_m from '../dumy-data/rus/dares_soft_m.json';
import rus_dares_soft_f from '../dumy-data/rus/dares_soft_f.json';

import spa_dares_hot_m from '../dumy-data/spa/dares_hot_m.json';
import spa_dares_hot_f from '../dumy-data/spa/dares_hot_f.json';
import spa_dares_soft_m from '../dumy-data/spa/dares_soft_m.json';
import spa_dares_soft_f from '../dumy-data/spa/dares_soft_f.json';

const couple_dares = {
	eng: {
		soft: [eng_dares_soft_f, eng_dares_soft_m],
		hot: [eng_dares_hot_f, eng_dares_hot_m]
	},
	rus: {
		soft: [rus_dares_soft_f, rus_dares_soft_m],
		hot: [rus_dares_hot_f, rus_dares_hot_m]
	},
	spa: {
		soft: [spa_dares_soft_f, spa_dares_soft_m],
		hot: [spa_dares_hot_f, spa_dares_hot_m]
	},
};

export const getCoupleDares = (lang, type, gender) => {
	return couple_dares[lang][type][gender];
};

import eng_questions_hot_m from '../dumy-data/eng/questions_hot_m.json';
import eng_questions_hot_f from '../dumy-data/eng/questions_hot_f.json';
import eng_questions_soft_m from '../dumy-data/eng/questions_soft_m.json';
import eng_questions_soft_f from '../dumy-data/eng/questions_soft_f.json';

import rus_questions_hot_m from '../dumy-data/rus/questions_hot_m.json';
import rus_questions_hot_f from '../dumy-data/rus/questions_hot_f.json';
import rus_questions_soft_m from '../dumy-data/rus/questions_soft_m.json';
import rus_questions_soft_f from '../dumy-data/rus/questions_soft_f.json';

import spa_questions_hot_m from '../dumy-data/spa/questions_hot_m.json';
import spa_questions_hot_f from '../dumy-data/spa/questions_hot_f.json';
import spa_questions_soft_m from '../dumy-data/spa/questions_soft_m.json';
import spa_questions_soft_f from '../dumy-data/spa/questions_soft_f.json';

const couple_questions = {
	eng: {
		soft: [eng_questions_soft_f, eng_questions_soft_m],
		hot: [eng_questions_hot_f, eng_questions_hot_m]
	},
	rus: {
		soft: [rus_questions_soft_f, rus_questions_soft_m],
		hot: [rus_questions_hot_f, rus_questions_hot_m]
	},
	spa: {
		soft: [spa_questions_soft_f, spa_questions_soft_m],
		hot: [spa_questions_hot_f, spa_questions_hot_m]
	},
};

export const getCoupleQuestions = (lang, type, gender) => {
	return couple_questions[lang][type][gender];
};