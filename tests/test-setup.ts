import { createSerializer } from '@emotion/jest';
import '@testing-library/jest-dom';

expect.addSnapshotSerializer(createSerializer());
