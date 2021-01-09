import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from 'ultis/fonts';
interface ItemTag {
  active: boolean;
  tagName: string;
}
const ItemTag = memo((props: ItemTag) => {
  const [isActive, setActive] = useState(props.active);
  let stylesTag;
  let colorText;
  if (isActive) {
    stylesTag = [styles.tagItemContainer, styles.colorActive];
    colorText = '#FFFFFF';
  } else {
    stylesTag = [styles.tagItemContainer, styles.colorInactive];
    colorText = '#7F8FA6';
  }
  const onChoice = useCallback(() => {
    setActive(!isActive);
  }, [isActive]);

  return (
    <TouchableOpacity style={stylesTag} onPress={onChoice}>
      <Text style={[styles.textTagName, {color: colorText}]}>
        {props.tagName}
      </Text>
    </TouchableOpacity>
  );
});

export default ItemTag;

const styles = StyleSheet.create({
  tagItemContainer: {
    height: 32,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  colorActive: {
    backgroundColor: '#ED3269',
  },
  colorInactive: {
    backgroundColor: '#F7F8FA',
  },
  textTagName: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
});
