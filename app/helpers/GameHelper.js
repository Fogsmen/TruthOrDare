export const SecToMinFormat = second => {
	return `${Math.floor(second/600)}${Math.floor(second/60)}:${Math.floor((second%60)/10)}${((second)%60)%10}`;
};

export const GenerateRandomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
