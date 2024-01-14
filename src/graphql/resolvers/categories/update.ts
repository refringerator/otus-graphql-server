import { ApolloResolver, ErrorCode } from '../../../types';
import { Category, CategoryMutationsPutArgs } from '../../../graphql.types';
import { CategoryModel } from '../../../models/Category';
import { UserDocument } from '../../../models/User';
import { GraphQLError } from 'graphql/index';
import { prepareCategory } from '../../../models/helpers/prepareCategory';
import { updateModel } from '../helpers';

export const update: (patch?: boolean) => ApolloResolver<never, Category | Error, CategoryMutationsPutArgs> =
  (patch) =>
  async (_, args, { user }) => {
    const { id, input } = args;
    const { commandId } = (user || {}) as UserDocument;
    const entity = await CategoryModel.findOne({ _id: id });
    if (!entity) {
      return new GraphQLError(`Category with id: "${id}" not found`, {
        extensions: {
          code: ErrorCode.NOT_FOUND,
          http: { status: 404 },
        },
      });
    }
    updateModel(input, entity, ['name', 'photo'], patch);

    // Выполняем валидацию перед сохранением
    const validationError = entity.validateSync();
    if (validationError) {
      // Если есть ошибки валидации, отправляем ValidationError
      return new GraphQLError(validationError.message, {
        extensions: {
          code: ErrorCode.VALIDATION,
          http: { status: 400 },
        },
      });
    }
    // Если валидация успешна, сохраняем документ
    await entity.save();
    return await prepareCategory(entity);
  };
