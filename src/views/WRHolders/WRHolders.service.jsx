import { Box, Icon, Text, Tooltip } from '@chakra-ui/react';
import { MdAccountCircle, MdOutlineSportsScore } from 'react-icons/md';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import '@fontsource/montserrat';
import DOMPurify from 'dompurify';

const columnHelper = createColumnHelper();

const fonts = {
  kk: 'trebuchet ms, Helvetica, sans-serif',
  kr: 'Montserrat, Helvetica Neue, Roboto',
};

const rankColor = rank => {
  switch (rank) {
    case 1:
      return '#efb310';
    case 2:
      return '#aacee3';
    case 3:
      return '#b06050';
    default:
      return null;
  }
};

const defaultColumns = [
  columnHelper.accessor('rank', {
    id: 'rank',
    width: "auto",
    header: () => <Text>Rank</Text>,
    cell: info => (
      <Text color={rankColor(info.getValue())}>{info.getValue()}</Text>
    ),
  }),
  columnHelper.accessor('nickname', {
    id: 'nickname',
    width: "auto",
    header: () => (
      <>
        <Icon boxSize='16px' as={MdAccountCircle} />
        <Text>Nickname</Text>
      </>
    ),
    cell: info => (
      <Box>
        <Tooltip label={info.row.original.login} placement='start'>
          <span
            style={{ fontFamily: fonts[info.table.options.meta.eventtype] }}
          >
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info.getValue()) }} />
          </span>
        </Tooltip>
      </Box>
    ),
  }),
  columnHelper.accessor('login', {
    id: 'login',
    width: "auto",
    header: () => <Icon boxSize='16px' as={MdAccountCircle} />,
    cell: info => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('wrs', {
    id: 'wrs',
    width: "auto",
    header: () => (
      <>
        <Icon boxSize='16px' as={MdOutlineSportsScore} display={{ base: 'none', md: 'block'}} />
        <Text>#WRs</Text>
      </>
    ),
    cell: info => <Text>{info.getValue()}</Text>,
  }),
];

export default defaultColumns;
