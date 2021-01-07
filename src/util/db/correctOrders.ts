import { db } from './db';
import { FooterItems } from '../interface/Interface';

type CorrectedData = {
  order: number;
  order_sidebar: number;
  footer_item_id: number;
};

type Return<T> = {
  updateParamInCase: string;
  idParam: number[];
  correctedData: T[];
};

export const generateCorrectOrdersParams = (
  data: FooterItems
): Return<Pick<CorrectedData, 'footer_item_id' | 'order'>> => {
  const correctedData = data.map((value, index) => {
    value.order = index + 1;
    return { order: value.order, footer_item_id: value.footer_item_id };
  });
  const idParam = correctedData.map((value) => {
    return value.footer_item_id;
  });
  const updateParamList = correctedData.map((value) => {
    return `WHEN ${value.footer_item_id} THEN ${value.order}`;
  });
  const updateParamInCase = updateParamList.join(' ');

  return { updateParamInCase, idParam, correctedData };
};

export const correctOrders = async (data: FooterItems): Promise<void> => {
  const { updateParamInCase, idParam } = generateCorrectOrdersParams(data);

  try {
    await db(
      'UPDATE `footer_items` SET `order` = CASE `footer_item_id` ' +
        updateParamInCase +
        ' END WHERE `footer_item_id` IN (?)',
      [idParam]
    );
  } catch (err) {
    throw `correctOrders: ${err}`;
  }
};

export const generateCorrectOrdersSidebarParams = (
  data: FooterItems
): Return<Pick<CorrectedData, 'footer_item_id' | 'order_sidebar'>> => {
  const onSidebar = data.filter((value) => {
    // return value.on_sidebar === true
    return value.order_sidebar !== 0;
  });
  const correctedData = onSidebar.map((value, index) => {
    value.order_sidebar = index + 1;
    return {
      order_sidebar: value.order_sidebar,
      footer_item_id: value.footer_item_id,
    };
  });
  const idParam = correctedData.map((value) => {
    return value.footer_item_id;
  });
  const updateParamList = correctedData.map((value) => {
    return `WHEN ${value.footer_item_id} THEN ${value.order_sidebar}`;
  });
  const updateParamInCase = updateParamList.join(' ');

  return { updateParamInCase, idParam, correctedData };
};

export const correctOrdersSidebar = async (
  data: FooterItems
): Promise<void> => {
  const { updateParamInCase, idParam } = generateCorrectOrdersSidebarParams(
    data
  );

  try {
    await db(
      'UPDATE `footer_items` SET `order_sidebar` = CASE `footer_item_id` ' +
        updateParamInCase +
        ' END WHERE `footer_item_id` IN (?)',
      [idParam]
    );
  } catch (err) {
    throw `correctOrdersSidebar: ${err}`;
  }
};
