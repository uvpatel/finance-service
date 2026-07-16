import React from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: number;
  flex?: number;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

function TableHeader<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.primary[50],
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary[200],
      }}
    >
      {columns.map(col => (
        <Text
          key={String(col.key)}
          style={{
            flex: col.flex ?? 0,
            width: col.flex ? undefined : col.width,
            fontSize: 11,
            fontWeight: '800',
            color: Colors.primary[700],
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {col.header}
        </Text>
      ))}
    </View>
  );
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage,
}: DataTableProps<T>) {
  if (isLoading) return <LoadingScreen message="Fetching data..." />;

  return (
    <View style={{ flex: 1 }}>
      <TableHeader columns={columns} />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.border }} />
        )}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 12,
              paddingVertical: 11,
              backgroundColor: index % 2 === 0 ? Colors.surface : Colors.gray[50],
              alignItems: 'center',
            }}
          >
            {columns.map(col => {
              const value = item[col.key];
              return (
                <View
                  key={String(col.key)}
                  style={{
                    flex: col.flex ?? 0,
                    width: col.flex ? undefined : col.width,
                  }}
                >
                  {col.render ? (
                    col.render(value, item)
                  ) : (
                    <Text
                      style={{ fontSize: 13, color: Colors.textPrimary }}
                      numberOfLines={2}
                    >
                      {String(value ?? '-')}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Records Found"
            description={emptyMessage ?? 'No data available.'}
          />
        }
      />
    </View>
  );
}
