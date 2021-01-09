import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import SvgSearch from 'svgs/SvgSearch';
import SvgClose from 'svgs/SvgClose';
import FONTS from 'ultis/fonts';

interface Props {
  onChangeText?: (text: string) => void;
  onClear?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeHolder?: string;
}

const SearchBar = memo((props: Props) => {
  const [value, setValue] = useState();

  const onChangeText = useCallback(
    text => {
      setValue(text);
      props.onChangeText && props.onChangeText(text);
    },
    [props],
  );

  const onClear = useCallback(() => {
    // @ts-ignore
    setValue();
    props.onClear && props.onClear('');
  }, [props]);

  return (
    <View style={styles.container}>
      <SvgSearch />
      <TextInput
        style={styles.txtInput}
        placeholder={props.placeHolder}
        placeholderTextColor={'#7F8FA6'}
        value={value}
        onChangeText={onChangeText}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <SvgClose />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

export default SearchBar;

const styles = StyleSheet.create({
  txtInput: {
    flex: 1,
    marginHorizontal: 17,
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
});
