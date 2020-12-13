import english from '../constants/lang/english.json';
import russian from '../constants/lang/russian.json';
import spanish from '../constants/lang/spanish.json';

export const eng = word => {
	return english[word] ?? word;
};

export const rus = word => {
	return russian[word] ?? word;
};

export const spa = word => {
	return spanish[word] ?? word;
};
