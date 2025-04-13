import { ColorValue } from 'react-native';

export class ContentFormatUtil {
    static colorFromString(colorString: string): ColorValue | undefined {
        if (colorString.startsWith('#')) {
            return colorString;
        }
        return undefined; // React Native handles named colors automatically
    }

    static alignmentFromString(alignmentString: string): 'flex-start' | 'center' | 'flex-end' | undefined {
        switch (alignmentString) {
            case 'topLeading':
            case 'leading':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'topTrailing':
            case 'trailing':
                return 'flex-end';
            default:
                return undefined;
        }
    }

    static verticalAlignmentFromString(alignmentString: string): 'flex-start' | 'center' | 'flex-end' {
        switch (alignmentString) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'center';
        }
    }

    static horizontalAlignmentFromString(alignmentString: string): 'flex-start' | 'center' | 'flex-end' {
        switch (alignmentString) {
            case 'leading':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'trailing':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }
}