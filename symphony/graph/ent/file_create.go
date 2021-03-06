// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/symphony/graph/ent/file"
)

// FileCreate is the builder for creating a File entity.
type FileCreate struct {
	config
	create_time  *time.Time
	update_time  *time.Time
	_type        *string
	name         *string
	size         *int
	modified_at  *time.Time
	uploaded_at  *time.Time
	content_type *string
	store_key    *string
	category     *string
}

// SetCreateTime sets the create_time field.
func (fc *FileCreate) SetCreateTime(t time.Time) *FileCreate {
	fc.create_time = &t
	return fc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (fc *FileCreate) SetNillableCreateTime(t *time.Time) *FileCreate {
	if t != nil {
		fc.SetCreateTime(*t)
	}
	return fc
}

// SetUpdateTime sets the update_time field.
func (fc *FileCreate) SetUpdateTime(t time.Time) *FileCreate {
	fc.update_time = &t
	return fc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (fc *FileCreate) SetNillableUpdateTime(t *time.Time) *FileCreate {
	if t != nil {
		fc.SetUpdateTime(*t)
	}
	return fc
}

// SetType sets the type field.
func (fc *FileCreate) SetType(s string) *FileCreate {
	fc._type = &s
	return fc
}

// SetName sets the name field.
func (fc *FileCreate) SetName(s string) *FileCreate {
	fc.name = &s
	return fc
}

// SetSize sets the size field.
func (fc *FileCreate) SetSize(i int) *FileCreate {
	fc.size = &i
	return fc
}

// SetNillableSize sets the size field if the given value is not nil.
func (fc *FileCreate) SetNillableSize(i *int) *FileCreate {
	if i != nil {
		fc.SetSize(*i)
	}
	return fc
}

// SetModifiedAt sets the modified_at field.
func (fc *FileCreate) SetModifiedAt(t time.Time) *FileCreate {
	fc.modified_at = &t
	return fc
}

// SetNillableModifiedAt sets the modified_at field if the given value is not nil.
func (fc *FileCreate) SetNillableModifiedAt(t *time.Time) *FileCreate {
	if t != nil {
		fc.SetModifiedAt(*t)
	}
	return fc
}

// SetUploadedAt sets the uploaded_at field.
func (fc *FileCreate) SetUploadedAt(t time.Time) *FileCreate {
	fc.uploaded_at = &t
	return fc
}

// SetNillableUploadedAt sets the uploaded_at field if the given value is not nil.
func (fc *FileCreate) SetNillableUploadedAt(t *time.Time) *FileCreate {
	if t != nil {
		fc.SetUploadedAt(*t)
	}
	return fc
}

// SetContentType sets the content_type field.
func (fc *FileCreate) SetContentType(s string) *FileCreate {
	fc.content_type = &s
	return fc
}

// SetStoreKey sets the store_key field.
func (fc *FileCreate) SetStoreKey(s string) *FileCreate {
	fc.store_key = &s
	return fc
}

// SetCategory sets the category field.
func (fc *FileCreate) SetCategory(s string) *FileCreate {
	fc.category = &s
	return fc
}

// SetNillableCategory sets the category field if the given value is not nil.
func (fc *FileCreate) SetNillableCategory(s *string) *FileCreate {
	if s != nil {
		fc.SetCategory(*s)
	}
	return fc
}

// Save creates the File in the database.
func (fc *FileCreate) Save(ctx context.Context) (*File, error) {
	if fc.create_time == nil {
		v := file.DefaultCreateTime()
		fc.create_time = &v
	}
	if fc.update_time == nil {
		v := file.DefaultUpdateTime()
		fc.update_time = &v
	}
	if fc._type == nil {
		return nil, errors.New("ent: missing required field \"type\"")
	}
	if fc.name == nil {
		return nil, errors.New("ent: missing required field \"name\"")
	}
	if fc.size != nil {
		if err := file.SizeValidator(*fc.size); err != nil {
			return nil, fmt.Errorf("ent: validator failed for field \"size\": %v", err)
		}
	}
	if fc.content_type == nil {
		return nil, errors.New("ent: missing required field \"content_type\"")
	}
	if fc.store_key == nil {
		return nil, errors.New("ent: missing required field \"store_key\"")
	}
	return fc.sqlSave(ctx)
}

// SaveX calls Save and panics if Save returns an error.
func (fc *FileCreate) SaveX(ctx context.Context) *File {
	v, err := fc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fc *FileCreate) sqlSave(ctx context.Context) (*File, error) {
	var (
		builder = sql.Dialect(fc.driver.Dialect())
		f       = &File{config: fc.config}
	)
	tx, err := fc.driver.Tx(ctx)
	if err != nil {
		return nil, err
	}
	insert := builder.Insert(file.Table).Default()
	if value := fc.create_time; value != nil {
		insert.Set(file.FieldCreateTime, *value)
		f.CreateTime = *value
	}
	if value := fc.update_time; value != nil {
		insert.Set(file.FieldUpdateTime, *value)
		f.UpdateTime = *value
	}
	if value := fc._type; value != nil {
		insert.Set(file.FieldType, *value)
		f.Type = *value
	}
	if value := fc.name; value != nil {
		insert.Set(file.FieldName, *value)
		f.Name = *value
	}
	if value := fc.size; value != nil {
		insert.Set(file.FieldSize, *value)
		f.Size = *value
	}
	if value := fc.modified_at; value != nil {
		insert.Set(file.FieldModifiedAt, *value)
		f.ModifiedAt = *value
	}
	if value := fc.uploaded_at; value != nil {
		insert.Set(file.FieldUploadedAt, *value)
		f.UploadedAt = *value
	}
	if value := fc.content_type; value != nil {
		insert.Set(file.FieldContentType, *value)
		f.ContentType = *value
	}
	if value := fc.store_key; value != nil {
		insert.Set(file.FieldStoreKey, *value)
		f.StoreKey = *value
	}
	if value := fc.category; value != nil {
		insert.Set(file.FieldCategory, *value)
		f.Category = *value
	}

	id, err := insertLastID(ctx, tx, insert.Returning(file.FieldID))
	if err != nil {
		return nil, rollback(tx, err)
	}
	f.ID = strconv.FormatInt(id, 10)
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	return f, nil
}
