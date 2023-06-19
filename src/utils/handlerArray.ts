export const reduceListMatchAct = (data: any[]) => {
  const groupedData = data.reduce((result, item) => {
    const existingProduct = result.find((p) => p.productId === item.productId);
    if (existingProduct) {
      existingProduct.groups.push(item.groups);
    } else {
      result.push({
        productId: item.productId,
        groups: [item.groups]
      });
    }
    return result;
  }, []);
  return groupedData;
};

export const loopListMatchAct = (prodGroupsReduce: any) => {
  let result = [];
  let countWeek = 1;
  for (let item of prodGroupsReduce) {
    const duplicatedGroups = [];
    let count = 0;
    while (duplicatedGroups.length < 8) {
      const group = item.groups[count % item.groups.length];
      duplicatedGroups.push({ numberOfWeeks: countWeek, productId: item.productId, ...group });
      count++;
      countWeek++;
    }
    result.push({ groupsItem: duplicatedGroups });
  }
  return mergeLoopListMatchAct(result);
};

export const mergeLoopListMatchAct = (loopListMatchActs: any[]) => {
  const mergedGroups = loopListMatchActs.reduce((result, groupItem) => {
    const { groupsItem } = groupItem;
    groupsItem.forEach((group) => {
      const existingGroup = result.find((item) => item.numberOfWeeks === group.numberOfWeeks && item.productId === group.productId && item.groupId === group.groupId);
      if (existingGroup) {
        existingGroup.matchActivityIds.push(...group.matchActivityIds);
      } else {
        result.push({
          numberOfWeeks: group.numberOfWeeks,
          productId: group.productId,
          groupId: group.groupId,
          matchActivityIds: group.matchActivityIds.slice()
        });
      }
    });
    return result;
  }, []);

  return mergedGroups;
};

export const groupListMatchAct = (studentMatchActivitys: any[], value: string) => {
  const mergedProds = studentMatchActivitys.reduce((previous, itemA) => {
    const findProd = previous.find((item) => item[value] === itemA[value]);
    let result = [];
    if (findProd) {
      result.push(findProd);
    } else {
      const { productId, classId, teacherId, studentId } = itemA;
      previous.push({ productId, classId, teacherId, studentId });
    }
    return previous;
  }, []);

  return mergedProds;
};

export const validateTimeSlots = (dateTimeSlotDB: any, dateTimeSlotInput: any): boolean => {
  for (let x of dateTimeSlotDB) {
    for (let j of dateTimeSlotInput) {
      let keyX = Object.keys(x)[0];
      let keyJ = Object.keys(j)[0];
      if (x[keyX] === j[keyJ]) {
        return false;
      }
    }
  }
  return true;
};
