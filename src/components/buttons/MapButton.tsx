import ButtonIcon from 'components/buttons/ButtonIcon';
import IconClose from 'svgs/IconClose';
import IconDirection from 'svgs/IconDirection';
import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo, useCallback} from 'react';
import {width_screen} from "ultis/dimensions";

interface MapButtonProps {
  onBack: () => void;
  onDirection: () => void;
  bottom?: number;
  style?: ViewStyle;
}

const MapButton = memo((props: MapButtonProps) => {
  const onPressBack = useCallback(() => {
    props.onBack();
  }, []);
  const onPressDirection = useCallback(() => {
    props.onDirection();
  }, []);

  return (
    <View style={[styles.buttonIcon, props.style]}>
      <ButtonIcon onPress={onPressBack}>
        <IconClose />
      </ButtonIcon>
      {/* <ButtonIcon onPress={onPressDirection}>
        <IconDirection />
      </ButtonIcon> */}
    </View>
  );
});

export default MapButton;

const styles = StyleSheet.create({
  buttonIcon: {
    position: 'absolute',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    flexDirection: 'row',
    width: width_screen,
  },
});
