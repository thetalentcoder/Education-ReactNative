const convertUserCsvToJson = (csv) => {
  const csvArr = csv.split("\n").filter(section => section.trim() !== '');

  const sections = [];

  for (let index = 1; index < csvArr.length; index++) {
    const section = csvArr[index];
    let splitSection = section.split(',');
    sections.push({
      name: splitSection[0].trim(''),
      email: splitSection[1].trim(''),
      organizationName: splitSection[2].trim(''),
      groupName: splitSection[3].trim(''),
      password: splitSection[4].trim('')
    });
  }

  return sections;
};

module.exports = {
  convertUserCsvToJson
};
