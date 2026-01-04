/**
 * Extension metadata interface.
 */
export interface Extension {
  path: string;
  sort: number;
  icon: string;
  name?: string;
  locales: {
    [key: string]: {
      name: string;
      description: string;
      tags: string[];
    };
  };
}
