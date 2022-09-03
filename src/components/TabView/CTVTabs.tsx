import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import CTVIndicator from "./CTVIndicator";
import CTVTab from "./CTVTab";

interface CTVTabsProps {
  routes: any[];
  onTabPress: (tabIndex: number) => void;
  scrollX: Animated.Value;
}

const CTVTabs = (props: CTVTabsProps) => {
  const { routes, scrollX, onTabPress } = props;
  const containerRef = useRef();
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const tempMeasures = [];
    routes.forEach((item) => {
      item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
        tempMeasures.push({ x, y, width, height });
        if (tempMeasures.length == routes.length) {
          setMeasures(tempMeasures);
        }
      });
    });
  }, [routes]);

  const onTabItemPress = useCallback((index: number): void => onTabPress(index), [onTabPress]);

  return (
    <View>
      <View
        ref={containerRef}
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {routes?.map((item, index) => (
          <CTVTab key={index} ref={item.ref} item={item} onTabPress={() => onTabItemPress(index)} />
        ))}
      </View>
      {measures?.length > 0 && <CTVIndicator measures={measures} scrollX={scrollX} />}
    </View>
  );
};

export default CTVTabs;
