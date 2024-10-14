
import React, { useState } from 'react';
import { TreeSelect } from 'antd';


const convertDataToTreeSelectFormat = (data: any): any => {
  return {
    title: data.name,
    value: data._id,
    children: data.subcategories.map((subcategory: any) => convertDataToTreeSelectFormat(subcategory)),
  };
};

const TreeSelectComponent = ({
  categories,
  onCategoryChange 
}: {
  categories: any[];
  onCategoryChange: (selectedValue: string) => void; 
}) => {
  const [value, setValue] = useState<string | null>(null);

  const onChange = (newValue: string) => {
    setValue(newValue);
    onCategoryChange(newValue); 
  };

  
  const treeSelectData = categories.map(convertDataToTreeSelectFormat);

  return (
    <TreeSelect
      style={{ width: '200px' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeSelectData}
      placeholder="商品分类"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default TreeSelectComponent;