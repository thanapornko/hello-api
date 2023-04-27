module.exports = (sequelize, DataTypes) => {
  const Physical = sequelize.define(
    "Physical",
    {
      height: DataTypes.STRING,
      weight: DataTypes.STRING,
      waist: DataTypes.STRING,
      date: DataTypes.DATE
    },
    {
      underscored: true
    }
  );

  Physical.associate = db => {
    Physical.belongsTo(db.User, {
      foreignKey: "userId"
    });
  };

  return Physical;
};
