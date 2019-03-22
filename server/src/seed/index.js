import models from '../models';

export default async data => {
  return models.User.bulkCreate(data, {
    include: [models.Message],
  });
};
