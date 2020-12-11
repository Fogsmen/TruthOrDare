import { multiply } from "react-native-reanimated";

import questions from '../dumy-data/questions.json';
import questions_mm from '../dumy-data/questions_mm.json';
import questions_mf from '../dumy-data/questions_mf.json';
import questions_ff from '../dumy-data/questions_ff.json';
import dares from '../dumy-data/dares.json';
import dares_mm from '../dumy-data/dares_mm.json';
import dares_mf from '../dumy-data/dares_mf.json';
import dares_ff from '../dumy-data/dares_ff.json';

export const QuestionDares = gameType => {
	switch (gameType) {
		case 'multi':
			return {
				questions: questions,
				dares: dares
			};
		
		case 'mm':
			return {
				questions: questions_mm,
				dares: dares_mm
			};
	
		case 'mf':
			return {
				questions: questions_mf,
				dares: dares_mf
			};
		
		case 'ff':
			return {
				questions: questions_ff,
				dares: dares_ff
			};

		default:
			return null;
	}
};