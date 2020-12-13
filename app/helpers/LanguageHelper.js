import english from '../constants/lang/english.json';
import russian from '../constants/lang/russian.json';
import spanish from '../constants/lang/spanish.json';

export const en = word => {
	return english[word] ?? word;
};

export const ru = word => {
	return russian[word] ?? word;
};

export const sp = word => {
	return spanish[word] ?? word;
};
