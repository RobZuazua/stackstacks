import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button } from '@material-ui/core';
import { CardJobMinimal } from 'components/organisms';

const Jobs = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} key={index}>
            <CardJobMinimal
              title={`${item.title} (${item.subtitle})`}
              subtitle={`${item.amount}`}
              // showArrow
              titleProps={{
                variant: 'h6',
              }}
              subtitleProps={{
                variant: 'subtitle1',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Jobs;
