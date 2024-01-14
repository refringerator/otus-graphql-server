import { ApolloResolver, ErrorCode } from '../../../types';
import { Product, ProductMutationsRemoveArgs } from '../../../graphql.types';
import { ProductModel } from '../../../models/Product';
import { UserDocument } from '../../../models/User';
import { GraphQLError } from 'graphql/index';
import { prepareProduct } from '../../../models/helpers/prepareProduct';
import { withAuth } from '../../auth';

export const removeRaw: ApolloResolver<never, Product | Error, ProductMutationsRemoveArgs> = async (
  _,
  args,
  { user }
) => {
  const { id } = args;
  const { role } = (user || {}) as UserDocument;

  if (role !== 'admin') {
    return new GraphQLError(`Non admin user cant delete products`, {
      extensions: {
        code: ErrorCode.NOT_ALLOWED,
      },
    });
  }

  const entity = await ProductModel.findOneAndRemove({ _id: id });

  if (!entity) {
    return new GraphQLError(`Product with id: "${id}" not found`, {
      extensions: {
        code: ErrorCode.NOT_FOUND,
        http: { status: 404 },
      },
    });
  }
  return await prepareProduct(entity);
};

export const remove = withAuth(removeRaw);
